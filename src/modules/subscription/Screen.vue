<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>Subscriptions</h1>
      <Button
        label="History"
        icon="pi pi-history"
        outlined
        @click="openHistoryModal"
      />
    </div>

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
          <div class="price">{{ formatCurrency(plan.price) }}</div>
          <Tag
            v-if="activeSubscription?.planId === plan.$id"
            severity="success"
            value="Current Subscription"
            class="current-badge"
          />
        </div>

        <ul class="features-list">
          <li v-for="(feature, idx) in plan.features" :key="idx">
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
                ? 'Subscribed'
                : 'Subscribe Now'
            "
            :disabled="activeSubscription?.planId === plan.$id"
            :severity="
              activeSubscription?.planId === plan.$id ? 'secondary' : 'primary'
            "
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Transaction History Dialog -->
    <Dialog
      v-model:visible="isHistoryVisible"
      maximized
      modal
      header="Transaction History"
      :style="{ width: '75vw', height: '75vh' }"
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
              <h3>No Transactions Yet</h3>
              <p>You haven't made any subscription transactions.</p>
            </div>
          </template>
          <Column field="transactionDate" header="Date">
            <template #body="{ data }">
              {{ formatDate(data.transactionDate) }}
            </template>
          </Column>
          <Column field="planName" header="Plan Name"></Column>
          <Column field="amount" header="Amount">
            <template #body="{ data }">
              {{ formatCurrency(data.amount) }}
            </template>
          </Column>
          <Column field="status" header="Status">
            <template #body="{ data }">
              <Tag
                :value="data.status"
                :severity="getStatusSeverity(data.status)"
              />
            </template>
          </Column>
          <Column field="referenceId" header="Reference ID"></Column>
        </DataTable>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Skeleton from "primevue/skeleton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { databases, Query } from "../../lib/appwrite.js";
import { useAuthStore } from "../../store/auth.js";

const dbId = "6a31a1b80021df02203f";

const isLoading = ref(true);
const plans = ref([]);
const activeSubscription = ref(null);

const isHistoryVisible = ref(false);
const isLoadingHistory = ref(false);
const transactions = ref([]);

const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);

onMounted(async () => {
  isLoading.value = true;
  try {
    await authStore.initAuth();

    if (currentUser.value) {
      // Fetch subscription plans
      const plansRes = await databases.listDocuments(
        dbId,
        "subscription_plans",
      );
      plans.value = plansRes.documents;

      // Fetch current user's active subscription
      const subsRes = await databases.listDocuments(
        dbId,
        "user_subscriptions",
        [
          Query.equal("userId", currentUser.value.$id),
          Query.equal("status", "active"),
          Query.orderDesc("$createdAt"),
          Query.limit(1),
        ],
      );

      if (subsRes.documents.length > 0) {
        activeSubscription.value = subsRes.documents[0];
      }
    }
  } catch (err) {
    console.error("Failed to load subscription data", err);
  } finally {
    isLoading.value = false;
  }
});

const openHistoryModal = async () => {
  isHistoryVisible.value = true;
  isLoadingHistory.value = true;

  try {
    if (currentUser.value) {
      const txRes = await databases.listDocuments(
        dbId,
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
  background-color: var(--p-surface-900);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--p-surface-800);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
  color: var(--p-surface-0);
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
  color: var(--p-surface-300);
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--p-surface-800);
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
  color: var(--p-surface-500);
  margin-bottom: 1rem;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--p-surface-100);
}

.empty-state p {
  margin: 0;
  color: var(--p-surface-400);
}
</style>
