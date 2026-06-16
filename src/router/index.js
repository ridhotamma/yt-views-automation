import { createRouter, createWebHistory } from "vue-router";
import { h } from "vue";
const EmptyView = { render: () => h("div") };
import ProxyScreen from "../modules/proxy/Screen.vue";
import LoginScreen from "../modules/auth/Screen.vue";
import { account } from "../lib/appwrite";

const router = createRouter({
	history: createWebHistory(),
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
	],
});

router.beforeEach(async (to, from, next) => {
	let user = null;
	try {
		user = await account.get();
	} catch (err) {
		user = null;
	}

	if (to.meta.requiresAuth && !user) {
		next({ name: "login" });
	} else if (to.meta.requiresGuest && user) {
		next({ name: "media-player" });
	} else {
		next();
	}
});

export default router;
