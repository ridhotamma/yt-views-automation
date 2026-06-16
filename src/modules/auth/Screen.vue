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

        <Form :resolver="resolver" @submit="onFormSubmit" class="auth-form" v-slot="$form">
          <div class="input-group">
            <FloatLabel variant="on">
              <InputText id="email" name="email" type="email" style="width: 100%" autocomplete="email" />
              <label for="email">Email address</label>
            </FloatLabel>
            <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
              {{ $form.email.error?.message }}
            </Message>
          </div>

          <div class="input-group">
            <FloatLabel variant="on">
              <InputText id="password" name="password" type="password" style="width: 100%" autocomplete="current-password" />
              <label for="password">Password</label>
            </FloatLabel>
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple" style="margin: 0;">
                {{ $form.password.error?.message }}
              </Message>
              <div v-else></div>
              <router-link to="/forgot-password" class="auth-link" style="font-size: 0.875rem; margin-top: 0.25rem;">Forgot password?</router-link>
            </div>
          </div>

          <Message v-if="authError" severity="error" size="small" variant="simple">{{ authError }}</Message>

          <Button type="submit" label="Sign in" class="w-full" :loading="isLoading" />
        </Form>

        <div class="divider">
          <span>or</span>
        </div>

        <Button label="Sign in with Google" icon="pi pi-google" severity="secondary" outlined class="w-full" @click="handleGoogleLogin" />

        <div class="auth-footer">
          <p>Don't have an account? <router-link to="/register" class="auth-link">Sign up</router-link></p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { account } from '../../lib/appwrite'
import { OAuthProvider } from 'appwrite'

import { Form } from '@primevue/forms'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message'

const router = useRouter()
const isLoading = ref(false)
const authError = ref('')

const resolver = ({ values }) => {
  const errors = {}

  if (!values.email) {
    errors.email = [{ message: 'Email is required' }]
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = [{ message: 'Please enter a valid email address' }]
  }

  if (!values.password) {
    errors.password = [{ message: 'Password is required' }]
  } else if (values.password.length < 8) {
    errors.password = [{ message: 'Password must be at least 8 characters' }]
  }

  return { errors }
}

const onFormSubmit = async (e) => {
  if (!e.valid) return

  isLoading.value = true
  authError.value = ''

  try {
    await account.createEmailPasswordSession(e.states.email.value, e.states.password.value)
    router.push('/')
  } catch (error) {
    authError.value = error.message || 'Failed to login. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}

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

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.p-error {
  color: var(--p-red-400, #f87171);
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

.w-full {
  width: 100%;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid var(--p-surface-700, #333);
}

.divider span {
  padding: 0 1rem;
  color: var(--p-surface-500, #888);
  font-size: 0.875rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--p-surface-400, #aaa);
  font-size: 0.875rem;
}

.auth-link {
  color: var(--p-primary-400, #f87171);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.auth-link:hover {
  color: var(--p-primary-300, #fca5a5);
}
</style>
