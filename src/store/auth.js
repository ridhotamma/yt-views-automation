import { defineStore } from "pinia";
import { account } from "../lib/appwrite.js";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null,
	}),
	actions: {
		async initAuth() {
			if (this.user) return this.user;

			try {
				const currentUser = await account.get();
				this.user = currentUser;
				return this.user;
			} catch (e) {
				console.error("Not logged in or failed to fetch user:", e);
				this.user = null;
				return null;
			}
		},
		setUser(user) {
			this.user = user;
		},
		clearUser() {
			this.user = null;
		},
	},
	persist: true,
});
