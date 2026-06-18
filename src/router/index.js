import { createRouter, createWebHashHistory } from "vue-router";
import { h } from "vue";
const EmptyView = { render: () => h("div") };

const ProxyScreen = () => import("../modules/proxy/Screen.vue");
const SubscriptionScreen = () => import("../modules/subscription/Screen.vue");
const SettingsScreen = () => import("../modules/settings/Screen.vue");
const LoginScreen = () => import("../modules/auth/Screen.vue");

import { useAuthStore } from "../store/auth.js";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: "/login",
			name: "login",
			component: LoginScreen,
			meta: { requiresGuest: true },
		},
		{
			path: "/",
			name: "media-player",
			component: EmptyView,
			meta: { requiresAuth: true },
		},
		{
			path: "/proxy",
			name: "proxy",
			component: ProxyScreen,
			meta: { requiresAuth: true },
		},
		{
			path: "/subscription",
			name: "subscription",
			component: SubscriptionScreen,
			meta: { requiresAuth: true },
		},
		{
			path: "/settings",
			name: "settings",
			component: SettingsScreen,
			meta: { requiresAuth: true },
		},
	],
});

router.beforeEach(async (to, from, next) => {
	const authStore = useAuthStore();
	const user = await authStore.initAuth();

	if (to.meta.requiresAuth && !user) {
		return next({ name: "login" });
	}

	if (to.meta.requiresGuest && user) {
		return next({ name: "media-player" });
	}

	if (to.meta.requiresAuth && to.name !== "subscription" && user) {
		if (authStore.hasActiveSubscription === false) {
			return next({ name: "subscription" });
		}
	}

	next();
});

export default router;
