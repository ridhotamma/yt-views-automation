<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-brand">
          <img src="/images/logo.png" alt="Logo" class="auth-logo" />
          <span class="brand-title font-britney">Youtumate</span>
        </div>
        <h2>Set New Password</h2>
        <p>Enter your new password below</p>
      </div>

      <div v-if="successMessage" class="success-message">
        <i class="pi pi-check-circle" style="font-size: 3rem; color: var(--p-green-500); margin-bottom: 1rem; display: block;"></i>
        <p>{{ successMessage }}</p>
        <Button label="Go to sign in" class="w-full mt-4" @click="$router.push('/login')" />
      </div>

      <Form v-else :resolver="resolver" @submit="onFormSubmit" class="auth-form" v-slot="$form">
        <div class="input-group">
          <FloatLabel variant="on">
            <InputText id="password" name="password" type="password" style="width: 100%" autocomplete="new-password" />
            <label for="password">New Password</label>
          </FloatLabel>
          <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
            {{ $form.password.error?.message }}
          </Message>
        </div>

        <div class="input-group">
          <FloatLabel variant="on">
            <InputText id="confirmPassword" name="confirmPassword" type="password" style="width: 100%" autocomplete="new-password" />
            <label for="confirmPassword">Confirm Password</label>
          </FloatLabel>
          <Message v-if="$form.confirmPassword?.invalid" severity="error" size="small" variant="simple">
            {{ $form.confirmPassword.error?.message }}
          </Message>
        </div>

        <Message v-if="authError" severity="error" size="small" variant="simple">{{ authError }}</Message>

        <Button type="submit" label="Reset Password" class="w-full" :loading="isLoading" />
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { account } from "../../lib/appwrite";

import { Form } from "@primevue/forms";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Message from "primevue/message";

const route = useRoute();

const isLoading = ref(false);
const authError = ref("");
const successMessage = ref("");

const userId = ref("");
const secret = ref("");

onMounted(() => {
	userId.value = route.query.userId || "";
	secret.value = route.query.secret || "";

	if (!userId.value || !secret.value) {
		authError.value = "Invalid password reset link. Please request a new one.";
	}
});

const resolver = ({ values }) => {
	const errors = {};

	if (!values.password) {
		errors.password = [{ message: "Password is required" }];
	} else if (values.password.length < 8) {
		errors.password = [{ message: "Password must be at least 8 characters" }];
	}

	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = [{ message: "Passwords do not match" }];
	}

	return { errors };
};

const onFormSubmit = async (e) => {
	if (!e.valid) return;
	if (!userId.value || !secret.value) {
		authError.value = "Invalid or expired reset link.";
		return;
	}

	isLoading.value = true;
	authError.value = "";

	try {
		await account.updateRecovery(
			userId.value,
			secret.value,
			e.states.password.value,
			e.states.confirmPassword.value,
		);
		successMessage.value = "Your password has been successfully reset.";
	} catch (error) {
		authError.value =
			error.message || "Failed to reset password. The link might be expired.";
	} finally {
		isLoading.value = false;
	}
};
</script>

<style scoped>
.auth-container { display: flex; align-items: center; justify-content: center; min-height: 100vh; width: 100%; background-color: var(--p-surface-950, #121212); padding: 1rem; }
.auth-card { width: 100%; max-width: 400px; background-color: var(--p-surface-900, #1a1a1a); padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5); border: 1px solid var(--p-surface-700, #333); }
.auth-header { text-align: center; margin-bottom: 2rem; }
.auth-brand { display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; }
.font-britney { font-family: 'Britney', cursive; }
.brand-title { font-weight: 700; font-size: 2rem; color: var(--p-primary-500, #ef4444); }
.auth-logo { width: 48px; height: 48px; border-radius: 12px; }
.auth-header h2 { margin: 0; font-size: 1.75rem; color: var(--p-surface-0, #fff); }
.auth-header p { margin: 0.5rem 0 0; color: var(--p-surface-400, #aaa); }
.auth-form { display: flex; flex-direction: column; gap: 1.5rem; }
.input-group { display: flex; flex-direction: column; gap: 0.25rem; }
.w-full { width: 100%; }
.mt-4 { margin-top: 1rem; }
.auth-footer { text-align: center; margin-top: 0.5rem; color: var(--p-surface-400, #aaa); font-size: 0.875rem; }
.auth-link { color: var(--p-primary-400, #f87171); text-decoration: none; font-weight: 600; transition: color 0.2s; }
.auth-link:hover { color: var(--p-primary-300, #fca5a5); }
.success-message { text-align: center; padding: 2rem 0; color: var(--p-surface-200); }
</style>
