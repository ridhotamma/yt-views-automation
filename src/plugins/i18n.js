import { createI18n } from "vue-i18n";

const messages = {
	en: {
		sidebar: {
			mediaPlayers: "Media Players",
			proxyList: "Proxy List",
			subscriptions: "Subscriptions",
			settings: "Settings",
			logout: "Logout",
		},
		settings: {
			title: "Settings",
			theme: "Theme",
			language: "Language",
			lightMode: "Light",
			darkMode: "Dark",
		},
		subscriptions: {
			title: "Subscriptions",
			history: "History",
			monthly: "Monthly",
			annually: "Annually",
			subscribeNow: "Subscribe Now",
			subscribed: "Subscribed",
		},
	},
	id: {
		sidebar: {
			mediaPlayers: "Pemutar Media",
			proxyList: "Daftar Proxy",
			subscriptions: "Langganan",
			settings: "Pengaturan",
			logout: "Keluar",
		},
		settings: {
			title: "Pengaturan",
			theme: "Tema",
			language: "Bahasa",
			lightMode: "Terang",
			darkMode: "Gelap",
		},
		subscriptions: {
			title: "Langganan",
			history: "Riwayat",
			monthly: "Bulanan",
			annually: "Tahunan",
			subscribeNow: "Berlangganan Sekarang",
			subscribed: "Berlangganan",
		},
	},
};

export const i18n = createI18n({
	legacy: false, // use Composition API
	locale: "en", // default locale
	fallbackLocale: "en",
	messages,
});
