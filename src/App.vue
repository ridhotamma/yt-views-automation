<template>
  <div v-if="['login'].includes($route.name)" class="full-screen">
    <router-view />
  </div>

  <div v-else id="app-layout">
    <AppSidebar />

    <!-- Main Content -->
    <main class="main-content">
      <MediaPlayerScreen v-show="$route.name === 'media-player'" />
      <router-view v-show="$route.name !== 'media-player'" />
    </main>
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useAuthStore } from "./store/auth";
import { useSettingsStore } from "./store/settings";
import { useI18n } from "vue-i18n";
import MediaPlayerScreen from "./modules/media-player/Screen.vue";
import AppSidebar from "./components/AppSidebar.vue";

const authStore = useAuthStore();
const settingsStore = useSettingsStore();
const { locale } = useI18n();

onMounted(async () => {
	await authStore.initAuth();

	if (settingsStore.theme === "dark") {
		document.documentElement.classList.add("app-dark");
	} else {
		document.documentElement.classList.remove("app-dark");
	}
	locale.value = settingsStore.locale;
});

watch(
	() => settingsStore.theme,
	(newTheme) => {
		if (newTheme === "dark") {
			document.documentElement.classList.add("app-dark");
		} else {
			document.documentElement.classList.remove("app-dark");
		}
	},
);

watch(
	() => settingsStore.locale,
	(newLocale) => {
		locale.value = newLocale;
	},
);
</script>

<style scoped>
#app-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  flex: 1;
  background-color: var(--app-bg);
  overflow-y: auto;
}

.global-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--app-bg);
  color: var(--p-primary-500, #ef4444);
}

.full-screen {
  width: 100%;
  min-height: 100vh;
}
</style>
