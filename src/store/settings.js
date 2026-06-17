import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
	const theme = ref("dark"); // "dark" or "light"
	const locale = ref("en"); // "en" or "id"

	const setTheme = (newTheme) => {
		theme.value = newTheme;
	};

	const setLocale = (newLocale) => {
		locale.value = newLocale;
	};

	return { theme, locale, setTheme, setLocale };
}, {
	persist: true,
});
