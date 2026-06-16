<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-brand">
          <img src="/images/logo.png" alt="Logo" class="auth-logo" />
          <span class="brand-title font-britney">Youtumate</span>
        </div>
        <h2>Welcome back</h2>
        <p>Sign in to your Youtumate account</p>
      </div>

        <Button label="Sign in with Google" icon="pi pi-google" severity="secondary" outlined class="w-full" @click="handleGoogleLogin" />
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

const authError = ref("");

const handleGoogleLogin = () => {
	try {
		const successUrl = window.location.origin + "/";
		const failureUrl = window.location.origin + "/login";
		account.createOAuth2Session(OAuthProvider.Google, successUrl, failureUrl);
	} catch (error) {
		authError.value = "Failed to initialize Google login.";
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
  background-color: var(--p-surface-950, #121212);
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  background-color: var(--p-surface-900, #1a1a1a);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--p-surface-700, #333);
}

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header p {
  margin: 0.5rem 0 0;
  color: var(--p-surface-400, #aaa);
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
  color: var(--p-primary-500, #ef4444);
}

.auth-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
}

.auth-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: var(--p-surface-0, #fff);
}

.auth-header p {
  margin: 0.5rem 0 0;
  color: var(--p-surface-400, #aaa);
}

.w-full {
  width: 100%;
}
</style>
