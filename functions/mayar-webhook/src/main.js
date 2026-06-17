import { Client, Databases, Query, ID, Users } from "node-appwrite";

export default async ({ req, res, log, error }) => {
	if (req.method !== "POST") {
		return res.json({ success: false, message: "Method not allowed" }, 405);
	}

	try {
		const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
		
		const client = new Client()
			.setEndpoint(
				process.env.APPWRITE_FUNCTION_ENDPOINT ||
					"https://sgp.cloud.appwrite.io/v1",
			)
			.setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
			.setKey(req.headers["x-appwrite-key"] || process.env.APPWRITE_API_KEY);

		const databases = new Databases(client);
		const databaseId = "6a31a1b80021df02203f";
		const subCollectionId = "user_subscriptions";
		const plansCollectionId = "subscription_plans";
		const transCollectionId = "user_subscription_transactions";

		// ==========================================
		// ROUTE: Free Plan Subscription
		// ==========================================
		if (body && body.action === "subscribe_free_plan") {
			const userId = req.headers["x-appwrite-user-id"];
			if (!userId) {
				error("Unauthorized access attempt. No user ID found.");
				return res.json({ success: false, message: "Unauthorized" }, 401);
			}

			const { planId, billingCycle } = body;
			if (!planId) {
				return res.json({ success: false, message: "Missing planId" }, 400);
			}

			const planDoc = await databases.getDocument(
				databaseId,
				plansCollectionId,
				planId,
			);
			
			if (planDoc.planType !== "free_plan") {
				return res.json(
					{ success: false, message: "Cannot subscribe to paid plan via this endpoint" },
					403,
				);
			}

			const activeSubsResponse = await databases.listDocuments(
				databaseId,
				subCollectionId,
				[Query.equal("userId", userId), Query.equal("status", "active")],
			);

			for (const sub of activeSubsResponse.documents) {
				await databases.updateDocument(databaseId, subCollectionId, sub.$id, {
					status: "inactive",
				});
				log(`Deactivated old subscription ${sub.$id} for user ${userId}`);
			}

			const now = new Date();
			const expiredDate = new Date();
			if (billingCycle === "monthly") {
				expiredDate.setDate(now.getDate() + 30);
			} else {
				expiredDate.setFullYear(now.getFullYear() + 1);
			}

			const subDoc = await databases.createDocument(
				databaseId,
				subCollectionId,
				ID.unique(),
				{
					userId: userId,
					planId: planId,
					status: "active",
					startDate: now.toISOString(),
					expiredDate: expiredDate.toISOString(),
				},
			);

			await databases.createDocument(
				databaseId,
				transCollectionId,
				ID.unique(),
				{
					userId: userId,
					planId: planId,
					amount: billingCycle === "monthly" ? planDoc.priceMonthly : planDoc.priceAnnually,
					status: "success",
					transactionDate: now.toISOString(),
					referenceId: `FREE-${ID.unique().substring(0, 8).toUpperCase()}`,
				},
			);

			log(`Created free subscription ${subDoc.$id} for user ${userId}`);
			return res.json({ success: true, subscription: subDoc });
		}

		// ==========================================
		// ROUTE: Mayar Webhook
		// ==========================================
		log("Received Mayar Webhook");

		const expectedToken = process.env.MAYAR_WEBHOOK_TOKEN;
		if (expectedToken) {
			const authHeader = req.headers["authorization"] || "";
			if (authHeader !== `Bearer ${expectedToken}`) {
				error("Unauthorized webhook attempt. Invalid token.");
				return res.json({ success: false, message: "Unauthorized" }, 401);
			}
		}

		log("Request Body: " + JSON.stringify(body, null, 2));

		if (!body || !body.event) {
			return res.json(
				{ success: false, message: "Invalid payload structure" },
				400,
			);
		}

		// Mayar sends "payment.received", "payment.success", "transaction.success", or "testing"
		if (
			body.event !== "payment.received" &&
			body.event !== "payment.success" &&
			body.event !== "transaction.success" &&
			body.event !== "testing"
		) {
			log(`Ignoring event: ${body.event}`);
			return res.json({ success: true, message: "Event ignored" });
		}

		const data = body.data;
		if (!data || !data.id) {
			return res.json(
				{ success: false, message: "Missing transaction data" },
				400,
			);
		}

		const transactionId = data.id;
		const status = data.status;

		if (status !== "SUCCESS") {
			log(`Transaction ${transactionId} status is ${status}. Ignoring.`);
			return res.json({ success: true, message: "Transaction not successful" });
		}

		const usersAPI = new Users(client);

		// 1. Find User by Email
		const customerEmail = data.customerEmail;
		if (!customerEmail) {
			return res.json(
				{ success: false, message: "No customer email provided" },
				400,
			);
		}

		log(`Looking up user with email: ${customerEmail}`);
		const userList = await usersAPI.list([Query.equal("email", customerEmail)]);
		if (userList.users.length === 0) {
			log(`User with email ${customerEmail} not found in Appwrite.`);
			return res.json({ success: false, message: "User not found" }, 404);
		}
		const user = userList.users[0];
		const userId = user.$id;

		// 2. Determine Plan based on amount
		const amount = data.amount;
		log(
			`Looking up plan with priceMonthly or priceAnnually equal to: ${amount}`,
		);

		const plansList = await databases.listDocuments(
			databaseId,
			plansCollectionId,
		);
		let matchedPlan = null;
		let billingCycle = "monthly"; // "monthly" or "annually"

		for (const plan of plansList.documents) {
			if (plan.priceMonthly === amount) {
				matchedPlan = plan;
				billingCycle = "monthly";
				break;
			}
			if (plan.priceAnnually === amount) {
				matchedPlan = plan;
				billingCycle = "annually";
				break;
			}
		}

		if (!matchedPlan) {
			log(`No subscription plan found for amount: ${amount}`);
			return res.json(
				{ success: false, message: "Plan not found for the given amount" },
				404,
			);
		}

		const planId = matchedPlan.$id;

		// 3. Check if transaction already exists
		const transResponse = await databases.listDocuments(
			databaseId,
			transCollectionId,
			[Query.equal("referenceId", transactionId.toString()), Query.limit(1)],
		);

		if (transResponse.documents.length > 0) {
			log(`Transaction ${transactionId} already processed.`);
			return res.json({
				success: true,
				message: "Transaction already processed",
			});
		}

		// 4. Create Transaction Record
		await databases.createDocument(databaseId, transCollectionId, ID.unique(), {
			userId: userId,
			planId: planId,
			amount: amount,
			status: "success",
			transactionDate: new Date().toISOString(),
			referenceId: transactionId.toString(),
		});
		log(`Created transaction record for ${transactionId}`);

		// 5. Deactivate old subscriptions for different plans
		const activeSubsResponse = await databases.listDocuments(
			databaseId,
			subCollectionId,
			[Query.equal("userId", userId), Query.equal("status", "active")],
		);

		for (const sub of activeSubsResponse.documents) {
			if (sub.planId !== planId) {
				await databases.updateDocument(databaseId, subCollectionId, sub.$id, {
					status: "inactive",
				});
				log(`Deactivated old subscription ${sub.$id} for user ${userId}`);
			}
		}

		// 6. Update or Create Subscription
		const subResponse = await databases.listDocuments(
			databaseId,
			subCollectionId,
			[
				Query.equal("userId", userId),
				Query.equal("planId", planId),
				Query.limit(1),
			],
		);

		const now = new Date();
		let durationDays = billingCycle === "monthly" ? 30 : 365;
		const addedTime = durationDays * 24 * 60 * 60 * 1000;
		const futureDate = new Date(now.getTime() + addedTime);

		if (subResponse.documents.length > 0) {
			const subscription = subResponse.documents[0];

			let newExpiry = futureDate;
			if (subscription.status === "active" && subscription.expiredDate) {
				const currentExpiry = new Date(subscription.expiredDate);
				if (currentExpiry > now) {
					newExpiry = new Date(currentExpiry.getTime() + addedTime);
				}
			}

			await databases.updateDocument(
				databaseId,
				subCollectionId,
				subscription.$id,
				{
					status: "active",
					expiredDate: newExpiry.toISOString(),
				},
			);
			log(`Updated subscription ${subscription.$id} for user ${userId}`);
		} else {
			await databases.createDocument(databaseId, subCollectionId, ID.unique(), {
				userId: userId,
				planId: planId,
				status: "active",
				startDate: now.toISOString(),
				expiredDate: futureDate.toISOString(),
			});
			log(`Created new subscription for user ${userId}`);
		}

		return res.json({
			success: true,
			message: "Webhook processed successfully",
		});
	} catch (err) {
		error("Webhook processing error: " + err.message);
		return res.json({ success: false, message: err.message }, 500);
	}
};
