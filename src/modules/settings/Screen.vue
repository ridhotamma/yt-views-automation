<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>{{ $t('settings.title') }}</h1>
    </div>

    <div class="settings-content">
      <!-- Theme Selection -->
      <div class="setting-item">
        <div class="setting-info">
          <h3>{{ $t('settings.theme') }}</h3>
          <p style="color: var(--p-surface-400); margin-top: 0.25rem;">Choose your preferred appearance.</p>
        </div>
        <div class="setting-action">
          <SelectButton
            v-model="theme"
            :options="themeOptions"
            optionLabel="label"
            optionValue="value"
            :allowEmpty="false"
          >
            <template #option="slotProps">
              <i :class="slotProps.option.icon" style="margin-right: 0.5rem"></i>
              {{ slotProps.option.label }}
            </template>
          </SelectButton>
        </div>
      </div>

      <Divider />

      <!-- Language Selection -->
      <div class="setting-item">
        <div class="setting-info">
          <h3>{{ $t('settings.language') }}</h3>
          <p style="color: var(--p-surface-400); margin-top: 0.25rem;">Select the application language.</p>
        </div>
        <div class="setting-action">
          <SelectButton
            v-model="locale"
            :options="localeOptions"
            optionLabel="label"
            optionValue="value"
            :allowEmpty="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useSettingsStore } from "../../store/settings";
import SelectButton from "primevue/selectbutton";
import Divider from "primevue/divider";

const { t } = useI18n();
const settingsStore = useSettingsStore();

const themeOptions = computed(() => [
  { label: t('settings.lightMode'), value: "light", icon: "pi pi-sun" },
  { label: t('settings.darkMode'), value: "dark", icon: "pi pi-moon" },
]);

const localeOptions = ref([
  { label: "English", value: "en" },
  { label: "Bahasa Indonesia", value: "id" },
]);

const theme = ref(settingsStore.theme);
const locale = ref(settingsStore.locale);

watch(theme, (newTheme) => {
  settingsStore.setTheme(newTheme);
});

watch(locale, (newLocale) => {
  settingsStore.setLocale(newLocale);
});
</script>

<style scoped>
.screen-container {
  padding: 2rem;
  max-height: 100vh;
  overflow-y: auto;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.settings-content {
  background-color: var(--p-surface-900);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--p-surface-800);
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.setting-info h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--p-surface-0);
}

@media screen and (max-width: 768px) {
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
