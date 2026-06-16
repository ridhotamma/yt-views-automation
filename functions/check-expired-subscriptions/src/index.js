import { Client, Databases, Query } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
    // You can use the Appwrite SDK to interact with other services
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        // Ensure you have an API key with databases.read and databases.write scopes 
        // set as an environment variable in the Appwrite Console
        .setKey(req.headers['x-appwrite-key'] || process.env.APPWRITE_API_KEY);

    const databases = new Databases(client);

    try {
        log('Starting subscription expiration check...');
        const databaseId = '6a31a1b80021df02203f';
        const collectionId = 'user_subscriptions';

        // Get current date string in ISO format for comparison
        const now = new Date().toISOString();

        // Query active subscriptions that have passed their expiredDate
        const response = await databases.listDocuments(databaseId, collectionId, [
            Query.equal('status', 'active'),
            Query.lessThan('expiredDate', now),
            Query.limit(100) // process in batches of 100
        ]);

        log(`Found ${response.documents.length} expired subscriptions to update.`);

        let updatedCount = 0;
        for (const doc of response.documents) {
            await databases.updateDocument(databaseId, collectionId, doc.$id, {
                status: 'expired'
            });
            updatedCount++;
            log(`Updated subscription ${doc.$id} to expired.`);
        }

        return res.json({
            success: true,
            message: `Successfully processed ${updatedCount} expired subscriptions.`
        });
    } catch (err) {
        error('Error updating subscriptions: ' + err.message);
        return res.json({
            success: false,
            message: err.message
        }, 500);
    }
};
