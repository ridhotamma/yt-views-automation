import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";

import App from "./App.vue";
import router from "./router";
import { i18n } from "./plugins/i18n";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);
app.use(i18n);
app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: {
			darkModeSelector: ".app-dark",
		},
	},
});
app.use(ToastService);
app.directive("tooltip", Tooltip);

router.isReady().then(() => {
	app.mount("#app");
});
