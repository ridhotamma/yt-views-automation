import { defineStore } from "pinia";
import { account, databases, Query, DB_ID } from "../lib/appwrite.js";

let authFetchPromise = null;

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null,
		hasActiveSubscription: null,
		activePlan: null,
	}),
	actions: {
		async initAuth(force = false) {
			if (authFetchPromise && !force) return authFetchPromise;

			authFetchPromise = (async () => {
				try {
					const currentUser = await account.get();
					this.user = currentUser;

					const subsRes = await databases.listDocuments(
						DB_ID,
						"user_subscriptions",
						[
							Query.equal("userId", currentUser.$id),
							Query.equal("status", "active"),
							Query.orderDesc("$createdAt"),
							Query.limit(1),
						],
					);
					this.hasActiveSubscription = subsRes.documents.length > 0;

					if (this.hasActiveSubscription) {
						const planDoc = await databases.getDocument(
							DB_ID,
							"subscription_plans",
							subsRes.documents[0].planId,
						);
						this.activePlan = planDoc;
					} else {
						this.activePlan = null;
					}

					return this.user;
				} catch (e) {
					console.error("Not logged in or failed to fetch user:", e);
					this.user = null;
					this.hasActiveSubscription = false;
					this.activePlan = null;
					return null;
				}
			})();

			return authFetchPromise;
		},
		setUser(user) {
			this.user = user;
		},
		setSubscriptionStatus(status, plan = null) {
			this.hasActiveSubscription = status;
			if (plan) {
				this.activePlan = plan;
			}
		},
		clearUser() {
			this.user = null;
			this.hasActiveSubscription = null;
			this.activePlan = null;
			authFetchPromise = null;
		},
	},
	persist: true,
});
