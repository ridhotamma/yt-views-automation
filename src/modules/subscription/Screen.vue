<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>{{ $t('subscriptions.title') }}</h1>
      <div style="display: flex; gap: 1rem; align-items: center">
        <SelectButton
          v-model="billingCycle"
          :options="[{ label: $t('subscriptions.monthly'), value: 'monthly' }, { label: $t('subscriptions.annually'), value: 'annually' }]"
          optionLabel="label"
          optionValue="value"
          :allowEmpty="false"
        />
        <Button
          icon="pi pi-refresh"
          outlined
          @click="refreshSubscription"
          :loading="isRefreshing"
          v-tooltip.top="'Refresh'"
        />
        <Button
          :label="$t('subscriptions.history')"
          icon="pi pi-history"
          outlined
          @click="openHistoryModal"
        />
      </div>
    </div>

    <!-- Current Plan Banner -->
    <Message v-if="currentPlanDetails" severity="secondary" :closable="false" style="margin-bottom: 2rem; font-size: 0.9rem; padding: 0.75rem 1rem;">
      <span v-if="currentPlanDetails.planType !== 'free_plan'" v-html="$t('subscriptions.currentPlanDesc', { name: `<strong>${currentPlanDetails.name}</strong>`, date: `<strong>${currentPlanDetails.expiredDate}</strong>` })"></span>
      <span v-else v-html="$t('subscriptions.currentPlanDescNoDate', { name: `<strong>${currentPlanDetails.name}</strong>` })"></span>
    </Message>
    <!-- Plans Section -->
    <div v-if="isLoading" class="plans-grid">
      <Skeleton
        v-for="i in 3"
        :key="i"
        width="100%"
        height="300px"
        borderRadius="12px"
      />
    </div>

    <div v-else class="plans-grid">
      <div v-for="plan in plans" :key="plan.$id" class="plan-card">
        <div class="plan-header">
          <h3>{{ plan.name }}</h3>
          <div class="price">
            {{
              formatCurrency(
                billingCycle === "monthly"
                  ? plan.priceMonthly
                  : plan.priceAnnually,
              )
            }}
          </div>
          <div
            style="
              color: var(--app-text-muted);
              font-size: 0.9rem;
              margin-top: 0.5rem;
            "
          >
            / {{ billingCycle === "monthly" ? $t('subscriptions.month') : $t('subscriptions.year') }}
          </div>
        </div>

        <ul class="features-list">
          <li v-for="(feature, idx) in ($i18n.locale === 'en' ? plan.features_en : plan.features_id)" :key="idx">
            <i
              class="pi pi-check-circle"
              style="color: var(--p-green-500); margin-right: 0.5rem"
            ></i>
            {{ feature }}
          </li>
        </ul>

        <div class="plan-footer">
          <Button
            :label="
              activeSubscription?.planId === plan.$id
                ? $t('subscriptions.subscribed')
                : $t('subscriptions.subscribeNow')
            "
            :disabled="activeSubscription?.planId === plan.$id || (isPremiumActive && plan.planType === 'free_plan')"
            :loading="isSubscribing && selectedPlan?.$id === plan.$id"
            :severity="
              activeSubscription?.planId === plan.$id ? 'secondary' : 'primary'
            "
            class="w-full"
            @click="handleSubscribeClick(plan)"
          />
        </div>
      </div>
    </div>

    <!-- Transaction History Dialog -->
    <Dialog
      v-model:visible="isHistoryVisible"
      modal
      :header="$t('subscriptions.transactionHistory')"
      :style="{ width: '75vw', height: '75vh' }"
      class="responsive-dialog"
    >
      <div style="padding: 1rem 0">
        <div v-if="isLoadingHistory">
          <Skeleton height="3rem" style="margin-bottom: 0.5rem" />
          <Skeleton height="3rem" style="margin-bottom: 0.5rem" />
          <Skeleton height="3rem" style="margin-bottom: 0.5rem" />
          <Skeleton height="3rem" style="margin-bottom: 0.5rem" />
          <Skeleton height="3rem" style="margin-bottom: 0.5rem" />
        </div>
        <DataTable
          v-else
          :value="transactions"
          paginator
          :rows="10"
          dataKey="$id"
          responsiveLayout="scroll"
        >
          <template #empty>
            <div class="empty-state">
              <i class="pi pi-receipt empty-icon"></i>
              <h3>{{ $t('subscriptions.noTransactions') }}</h3>
              <p>{{ $t('subscriptions.noTransactionsDesc') }}</p>
            </div>
          </template>
          <Column field="transactionDate" :header="$t('subscriptions.date')">
            <template #body="{ data }">
              {{ formatDate(data.transactionDate) }}
            </template>
          </Column>
          <Column field="planName" :header="$t('subscriptions.planName')"></Column>
          <Column field="amount" :header="$t('subscriptions.amount')">
            <template #body="{ data }">
              {{ formatCurrency(data.amount) }}
            </template>
          </Column>
          <Column field="status" :header="$t('subscriptions.status')">
            <template #body="{ data }">
              <Tag
                :value="data.status"
                :severity="getStatusSeverity(data.status)"
              />
            </template>
          </Column>
          <Column field="referenceId" :header="$t('subscriptions.referenceId')"></Column>
        </DataTable>
      </div>
    </Dialog>

    <!-- Payment Coming Soon Dialog -->
    <Dialog
      v-model:visible="isPaymentDialogVisible"
      modal
      :header="$t('subscriptions.comingSoon')"
      :style="{ width: '400px' }"
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 2rem 0;
        "
      >
        <i
          class="pi pi-credit-card"
          style="
            font-size: 3rem;
            color: var(--p-primary-500);
            margin-bottom: 1rem;
          "
        ></i>
        <p>{{ $t('subscriptions.paymentUnderDev') }}</p>
        <p style="color: var(--app-text-muted); font-size: 0.9rem">
          {{ $t('subscriptions.paymentNotConfigured') }}
        </p>
      </div>
      <template #footer>
        <Button
          :label="$t('common.close')"
          text
          @click="isPaymentDialogVisible = false"
          class="w-full"
        />
      </template>
    </Dialog>

    <!-- Payment Webview Dialog -->
    <Dialog
      v-model:visible="isPaymentWebviewVisible"
      modal
      :header="$t('subscriptions.securePayment')"
      :closable="true"
      :style="{ width: '50vw', height: '80vh' }"
      :contentStyle="{
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }"
      class="responsive-dialog"
    >
      <webview
        v-if="activePaymentUrl"
        :src="activePaymentUrl"
        style="
          flex: 1;
          width: 100%;
          height: 100%;
          border: none;
          background: #fff;
        "
      ></webview>
    </Dialog>

    <!-- Toast for Notifications -->
    <Toast />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";
import Dialog from "primevue/dialog";
import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Toast from "primevue/toast";
import Message from "primevue/message";
import { useToast } from "primevue/usetoast";
import {
	databases,
	functions,
	Query,
	DB_ID,
	client,
} from "../../lib/appwrite.js";
import { useAuthStore } from "../../store/auth.js";

const isLoading = ref(true);
const plans = ref([]);
const activeSubscription = ref(null);

const billingCycle = ref("monthly");

const isHistoryVisible = ref(false);
const isLoadingHistory = ref(false);
const transactions = ref([]);

const isPaymentDialogVisible = ref(false);
const isPaymentWebviewVisible = ref(false);
const activePaymentUrl = ref("");
const selectedPlan = ref(null);
const isSubscribing = ref(false);
const isRefreshing = ref(false);

const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);
const toast = useToast();

const isPremiumActive = computed(() => {
	if (!activeSubscription.value) return false;
	const currentPlan = plans.value.find(
		(p) => p.$id === activeSubscription.value.planId,
	);
	return currentPlan && currentPlan.planType === "paid_plan";
});

const currentPlanDetails = computed(() => {
	if (!activeSubscription.value || plans.value.length === 0) return null;
	const plan = plans.value.find(
		(p) => p.$id === activeSubscription.value.planId,
	);
	if (!plan) return null;

	const start = new Date(activeSubscription.value.startDate);
	const end = new Date(activeSubscription.value.expiredDate);

	const formatDate = (date) => {
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		}).format(date);
	};

	return {
		name: plan.name,
		status: activeSubscription.value.status,
		startDate: formatDate(start),
		expiredDate: formatDate(end),
		billingCycle: activeSubscription.value.paymentCycle || "monthly",
		planType: plan.planType,
	};
});

let realtimeUnsubscribe = null;

const fetchActiveSubscription = async () => {
	if (!currentUser.value) return;
	const subsRes = await databases.listDocuments({
		databaseId: DB_ID,
		collectionId: "user_subscriptions",
		queries: [
			Query.equal("userId", currentUser.value.$id),
			Query.equal("status", "active"),
			Query.orderDesc("$createdAt"),
			Query.limit(1),
		],
	});

	if (subsRes.documents.length > 0) {
		activeSubscription.value = subsRes.documents[0];
	} else {
		activeSubscription.value = null;
	}
};

const refreshSubscription = async () => {
	isRefreshing.value = true;
	try {
		await fetchActiveSubscription();
	} catch (e) {
		console.error("Failed to refresh subscription", e);
	} finally {
		isRefreshing.value = false;
	}
};

onMounted(async () => {
	isLoading.value = true;
	try {
		await authStore.initAuth();

		if (currentUser.value) {
			const plansRes = await databases.listDocuments({
				databaseId: DB_ID,
				collectionId: "subscription_plans",
			});
			plans.value = plansRes.documents;

			await fetchActiveSubscription();

			// Listen for realtime updates from the webhook
			realtimeUnsubscribe = client.subscribe(
				`databases.${DB_ID}.collections.user_subscriptions.documents`,
				(response) => {
					const payloadUserId = typeof response.payload.userId === 'object' && response.payload.userId !== null 
						? response.payload.userId.$id 
						: response.payload.userId;
						
					if (
						payloadUserId === currentUser.value.$id &&
						response.payload.status === "active"
					) {
						// Payment successful, update state!
						activeSubscription.value = response.payload;
						const matchedPlan = plans.value.find(
							(p) => p.$id === response.payload.planId,
						);
						if (matchedPlan) {
							authStore.setSubscriptionStatus(true, matchedPlan);
						}

						// Close webview
						isPaymentWebviewVisible.value = false;
						activePaymentUrl.value = "";

						toast.add({
							severity: "success",
							summary: "Payment Successful",
							detail: "Your subscription has been activated!",
							life: 5000,
						});

						// Refresh history
						if (isHistoryVisible.value) {
							openHistoryModal();
						}
					}
				},
			);
		}
	} catch (err) {
		console.error("Failed to load subscription data", err);
	} finally {
		isLoading.value = false;
	}
});

onUnmounted(() => {
	if (realtimeUnsubscribe) {
		realtimeUnsubscribe();
	}
});

const openHistoryModal = async () => {
	isHistoryVisible.value = true;
	isLoadingHistory.value = true;

	try {
		if (currentUser.value) {
			const txRes = await databases.listDocuments(
				DB_ID,
				"user_subscription_transactions",
				[
					Query.equal("userId", currentUser.value.$id),
					Query.orderDesc("transactionDate"),
				],
			);

			// Map plan IDs to plan names for better UX
			transactions.value = txRes.documents.map((tx) => {
				const plan = plans.value.find((p) => p.$id === tx.planId);
				return {
					...tx,
					planName: plan ? plan.name : tx.planId,
				};
			});
		}
	} catch (err) {
		console.error("Failed to fetch history", err);
	} finally {
		isLoadingHistory.value = false;
	}
};

const formatCurrency = (value) => {
	if (value === undefined || value === null) return "-";
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(value);
};

const formatDate = (dateString) => {
	if (!dateString) return "-";
	return new Date(dateString).toLocaleString("id-ID", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const getStatusSeverity = (status) => {
	switch (status?.toLowerCase()) {
		case "success":
		case "paid":
		case "active":
			return "success";
		case "pending":
			return "warn";
		case "failed":
		case "cancelled":
			return "danger";
		default:
			return "info";
	}
};

const handleSubscribeClick = async (plan) => {
	selectedPlan.value = plan;
	if (plan.planType === "free_plan") {
		await proceedSubscription();
	} else {
		const paymentLink =
			billingCycle.value === "monthly"
				? plan.paymentLinkMonthly
				: plan.paymentLinkAnnually;
		if (paymentLink) {
			const url = new URL(paymentLink);
			url.searchParams.set("name", currentUser.value.name);
			url.searchParams.set("email", currentUser.value.email);
			activePaymentUrl.value = url.toString();
			isPaymentWebviewVisible.value = true;
		} else {
			isPaymentDialogVisible.value = true;
		}
	}
};

const proceedSubscription = async () => {
	if (!selectedPlan.value || !currentUser.value) return;

	isSubscribing.value = true;

	try {
		const response = await functions.createExecution(
			"6a31b59f00148f93b6bb", // mayar_webhook
			JSON.stringify({
				action: "subscribe_free_plan",
				planId: selectedPlan.value.$id,
				billingCycle: billingCycle.value,
			}),
		);

		const result = JSON.parse(response.responseBody);
		if (!result.success) {
			throw new Error(result.message || "Failed to process subscription");
		}

		const subDoc = result.subscription;
		activeSubscription.value = subDoc;
		authStore.setSubscriptionStatus(true, selectedPlan.value);

		toast.add({
			severity: "success",
			summary: "Success",
			detail: "Successfully subscribed to " + selectedPlan.value.name,
			life: 3000,
		});
	} catch (err) {
		console.error("Subscription failed:", err);
		toast.add({
			severity: "error",
			summary: "Error",
			detail: "Failed to process subscription",
			life: 3000,
		});
	} finally {
		isSubscribing.value = false;
	}
};
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

.plans-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .plans-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

.plan-card {
  background-color: var(--app-card-bg);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--app-border);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-5px);
  border-color: var(--p-primary-500);
}

.plan-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.plan-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--app-text);
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--p-primary-400);
  margin-top: 1rem;
}

.current-badge {
  position: absolute;
  top: -3.5rem;
  right: -1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  flex-grow: 1;
}

.features-list li {
  padding: 0.75rem 0;
  color: var(--app-text-muted);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--app-border);
}

.features-list li:last-child {
  border-bottom: none;
}

.plan-footer {
  margin-top: auto;
}

.w-full {
  width: 100%;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  font-size: 3.5rem;
  color: var(--app-text-muted);
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--app-text);
}

.empty-state p {
  margin: 0;
  color: var(--app-text-muted);
}

@media screen and (max-width: 768px) {
  :deep(.responsive-dialog) {
    width: 100vw !important;
    height: 100vh !important;
    max-width: 100vw !important;
    max-height: 100vh !important;
    margin: 0 !important;
    border-radius: 0 !important;
  }
}
</style>
