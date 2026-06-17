import { defineStore } from "pinia";
import { account, databases, Query, DB_ID } from "../lib/appwrite.js";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null,
		hasActiveSubscription: null,
	}),
	actions: {
		async initAuth() {
			if (this.user && this.hasActiveSubscription !== null) return this.user;

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

				return this.user;
			} catch (e) {
				console.error("Not logged in or failed to fetch user:", e);
				this.user = null;
				this.hasActiveSubscription = false;
				return null;
			}
		},
		setUser(user) {
			this.user = user;
		},
		setSubscriptionStatus(status) {
			this.hasActiveSubscription = status;
		},
		clearUser() {
			this.user = null;
			this.hasActiveSubscription = null;
		},
	},
	persist: true,
});
