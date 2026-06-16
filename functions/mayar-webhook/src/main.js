import { Client, Databases, Query, ID } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
    if (req.method !== 'POST') {
        return res.json({ success: false, message: 'Method not allowed' }, 405);
    }

    try {
        log('Received Mayar Webhook');
        
        const body = req.body;
        
        if (!body || !body.type) {
            return res.json({ success: false, message: 'Invalid payload structure' }, 400);
        }

        if (body.type !== 'payment.received') {
            log(`Ignoring event type: ${body.type}`);
            return res.json({ success: true, message: 'Event ignored' });
        }

        let mayarPayload;
        try {
            mayarPayload = typeof body.payload === 'string' ? JSON.parse(body.payload) : body.payload;
        } catch (e) {
            error('Failed to parse inner payload');
            return res.json({ success: false, message: 'Failed to parse inner payload' }, 400);
        }

        const data = mayarPayload.data;
        if (!data || !data.transactionId) {
            return res.json({ success: false, message: 'Missing transaction data' }, 400);
        }

        const transactionId = data.transactionId;
        const status = data.status;

        if (status !== 'SUCCESS') {
            log(`Transaction ${transactionId} status is ${status}. Ignoring.`);
            return res.json({ success: true, message: 'Transaction not successful' });
        }

        const client = new Client()
            .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1')
            .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
            .setKey(req.headers['x-appwrite-key'] || process.env.APPWRITE_API_KEY);

        const databases = new Databases(client);
        const databaseId = '6a31a1b80021df02203f';
        const transCollectionId = 'user_subscription_transactions';
        const subCollectionId = 'user_subscriptions';

        log(`Looking up transaction with referenceId: ${transactionId}`);
        const transResponse = await databases.listDocuments(databaseId, transCollectionId, [
            Query.equal('referenceId', transactionId),
            Query.limit(1)
        ]);

        if (transResponse.documents.length === 0) {
            log(`Transaction ${transactionId} not found in database.`);
            return res.json({ success: false, message: 'Transaction not found' }, 404);
        }

        const transaction = transResponse.documents[0];
        
        await databases.updateDocument(databaseId, transCollectionId, transaction.$id, {
            status: 'success'
        });
        log(`Updated transaction ${transaction.$id} to success`);

        const userId = transaction.userId;
        const planId = transaction.planId;

        const subResponse = await databases.listDocuments(databaseId, subCollectionId, [
            Query.equal('userId', userId),
            Query.equal('planId', planId),
            Query.limit(1)
        ]);

        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

        if (subResponse.documents.length > 0) {
            const subscription = subResponse.documents[0];
            
            let newExpiry = thirtyDaysFromNow;
            if (subscription.status === 'active' && subscription.expiredDate) {
                const currentExpiry = new Date(subscription.expiredDate);
                if (currentExpiry > now) {
                    newExpiry = new Date(currentExpiry.getTime() + 30 * 24 * 60 * 60 * 1000);
                }
            }

            await databases.updateDocument(databaseId, subCollectionId, subscription.$id, {
                status: 'active',
                expiredDate: newExpiry.toISOString()
            });
            log(`Updated subscription ${subscription.$id} for user ${userId}`);
        } else {
            await databases.createDocument(databaseId, subCollectionId, ID.unique(), {
                userId: userId,
                planId: planId,
                status: 'active',
                startDate: now.toISOString(),
                expiredDate: thirtyDaysFromNow.toISOString()
            });
            log(`Created new subscription for user ${userId}`);
        }

        return res.json({ success: true, message: 'Webhook processed successfully' });

    } catch (err) {
        error('Webhook processing error: ' + err.message);
        return res.json({ success: false, message: err.message }, 500);
    }
};
