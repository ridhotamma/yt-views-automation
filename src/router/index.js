import { createRouter, createWebHistory } from "vue-router";
import MediaPlayerScreen from "../modules/media-player/Screen.vue";
import ProxyScreen from "../modules/proxy/Screen.vue";
import LoginScreen from "../modules/auth/Screen.vue";
import RegisterScreen from "../modules/auth/Register.vue";
import ForgotPasswordScreen from "../modules/auth/ForgotPassword.vue";
import ResetPasswordScreen from "../modules/auth/ResetPassword.vue";
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
			path: "/register",
			name: "register",
			component: RegisterScreen,
			meta: { requiresGuest: true },
		},
		{
			path: "/forgot-password",
			name: "forgot-password",
			component: ForgotPasswordScreen,
			meta: { requiresGuest: true },
		},
		{
			path: "/reset-password",
			name: "reset-password",
			component: ResetPasswordScreen,
			meta: { requiresGuest: true },
		},
		{
			path: "/",
			name: "media-player",
			component: MediaPlayerScreen,
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
