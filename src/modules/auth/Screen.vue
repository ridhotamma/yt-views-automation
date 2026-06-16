<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <img src="/images/logo.png" alt="Logo" class="auth-logo" />
        <h2>Welcome back</h2>
        <p>Sign in to your Youtumate account</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="input-group">
          <FloatLabel variant="on">
            <InputText id="email" v-model="form.email" type="email" style="width: 100%" autocomplete="email" />
            <label for="email">Email address</label>
          </FloatLabel>
          <small class="p-error" v-if="errors.email">{{ errors.email }}</small>
        </div>

        <div class="input-group">
          <FloatLabel variant="on">
            <InputText id="password" v-model="form.password" type="password" style="width: 100%" autocomplete="current-password" />
            <label for="password">Password</label>
          </FloatLabel>
          <small class="p-error" v-if="errors.password">{{ errors.password }}</small>
        </div>

        <Message v-if="authError" severity="error" size="small" variant="simple">{{ authError }}</Message>

        <Button type="submit" label="Sign in" class="w-full" :loading="isLoading" />
      </form>

      <div class="divider">
        <span>or</span>
      </div>

      <Button label="Sign in with Google" icon="pi pi-google" severity="secondary" outlined class="w-full" @click="handleGoogleLogin" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { account } from '../../lib/appwrite'
import { OAuthProvider } from 'appwrite'

import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import Message from 'primevue/message'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)
const authError = ref('')

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  authError.value = ''

  try {
    await account.createEmailPasswordSession(form.email, form.password)
    router.push('/')
  } catch (error) {
    authError.value = error.message || 'Failed to login. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = () => {
  try {
    const successUrl = window.location.origin + '/'
    const failureUrl = window.location.origin + '/login'
    account.createOAuth2Session(OAuthProvider.Google, successUrl, failureUrl)
  } catch (error) {
    authError.value = 'Failed to initialize Google login.'
  }
}
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

.auth-logo {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  margin-bottom: 1rem;
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
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--p-surface-700, #333);
}

.divider span {
  padding: 0 1rem;
  color: var(--p-surface-500, #888);
  font-size: 0.875rem;
}
</style>
