<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-brand">
          <img src="/images/logo.png" alt="Logo" class="auth-logo" />
          <span class="brand-title font-britney">Youtumate</span>
        </div>
        <h2>{{ $t('auth.welcomeBack') }}</h2>
        <p>{{ $t('auth.signInDesc') }}</p>
      </div>

      <Button :label="$t('auth.signInGoogle')" icon="pi pi-google" severity="secondary" outlined class="w-full" @click="handleGoogleLogin" />
      <Message v-if="authError" severity="error" size="small" variant="simple" style="margin-top: 1rem; display: block; text-align: center;">{{ authError }}</Message>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { account } from "../../lib/appwrite";
import { OAuthProvider } from "appwrite";

import Button from "primevue/button";
import Message from "primevue/message";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const authError = ref("");

const handleGoogleLogin = () => {
	try {
		const successUrl = import.meta.env.DEV ? window.location.origin + "/" : "http://localhost/callback";
		const failureUrl = import.meta.env.DEV ? window.location.origin + "/login" : "http://localhost/callback";
		account.createOAuth2Session(OAuthProvider.Google, successUrl, failureUrl);
	} catch (error) {
		authError.value = t("auth.failedGoogle");
	}
};
</script>

<style scoped>
.auth-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--app-bg);
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background-color: var(--app-card-bg);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--app-border);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header p {
  margin: 0.5rem 0 0;
  color: var(--app-text-muted);
}

.auth-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.font-britney {
  font-family: 'Britney', cursive;
}

.brand-title {
  font-weight: 700;
  font-size: 2rem;
  color: var(--app-primary);
}

.auth-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

.auth-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: var(--app-text-main);
}

.auth-header p {
  margin: 0.5rem 0 0;
  color: var(--app-text-muted);
}

.w-full {
  width: 100%;
}
</style>
