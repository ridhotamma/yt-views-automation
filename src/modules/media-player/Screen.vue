<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>Media Player</h1>
      <Button label="Create" icon="pi pi-plus" @click="isModalVisible = true" />
    </div>

    <div class="players-grid">
      <template v-if="isLoading">
        <div v-for="i in 4" :key="'skel-' + i" class="skeleton-card">
          <Skeleton width="100%" height="360px" borderRadius="12px" />
        </div>
      </template>
      <template v-else>
        <MediaPlayerCard 
          v-for="player in players" 
          :key="player.id" 
          :id="player.id"
          :youtubeUrls="player.youtubeUrls"
          :currentQueue="player.currentQueue"
          :proxyIp="player.proxyIp"
          :userAgent="player.userAgent"
          @stop="stopPlayer"
          @update:currentQueue="(val) => handleUpdateQueue(player, val)"
        />
        <div v-if="players.length === 0" class="empty-state">
          <i class="pi pi-video empty-icon"></i>
          <p>No media players running. Create one to get started!</p>
        </div>
      </template>
    </div>

    <Dialog v-model:visible="isModalVisible" modal header="Create New Media Player" :style="{ width: '500px' }" @hide="resetForm">
      <div class="url-inputs-container" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
        <div style="margin-bottom: 0.5rem; display: flex; gap: 1rem;">
          <FloatLabel variant="on" style="flex: 1;">
            <Select id="proxy-select" v-model="selectedProxyId" :options="proxiesList" optionLabel="name" optionValue="id" style="width: 100%" showClear />
            <label for="proxy-select">Proxy (Optional)</label>
          </FloatLabel>
          <FloatLabel variant="on" style="flex: 1;">
            <Select id="ua-select" v-model="selectedUaType" :options="uaOptions" optionLabel="label" optionValue="value" style="width: 100%" />
            <label for="ua-select">Device / User Agent</label>
          </FloatLabel>
        </div>

        <div v-for="(url, index) in queueList" :key="index" style="position: relative;">
          <FloatLabel variant="on">
            <InputText :id="'url-' + index" v-model="queueList[index]" style="width: 100%" autocomplete="off" />
            <label :for="'url-' + index">YouTube Video URL {{ index + 1 }}</label>
          </FloatLabel>
          <Button 
            v-if="queueList.length > 1" 
            icon="pi pi-times" 
            severity="danger" 
            text 
            rounded
            style="position: absolute; right: 0.25rem; top: 50%; transform: translateY(-50%);" 
            @click="queueList.splice(index, 1)" 
          />
        </div>

        <Message v-if="formError" severity="error" size="small" variant="simple">{{ formError }}</Message>

        <Button label="Add New URL" icon="pi pi-plus" outlined style="width: 100%; margin-top: 0.5rem;" @click="queueList.push('')" />
      </div>

      <template #footer>
        <Button label="Cancel" text severity="secondary" @click="isModalVisible = false" autofocus />
        <Button label="Create" @click="startPlayer" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import Skeleton from "primevue/skeleton";
import Select from "primevue/select";
import MediaPlayerCard from "./components/MediaPlayerCard.vue";
import { ytRegex } from "../../constants/validator.js";
import { databases, ID, Query, DB_ID } from "../../lib/appwrite.js";
import { useAuthStore } from "../../store/auth.js";
import { generateUserAgent } from "../../utils/userAgent.js";

const isModalVisible = ref(false);
const isLoading = ref(true);
const players = ref([]);
const queueList = ref([""]);
const formError = ref("");
const selectedProxyId = ref(null);
const proxiesList = ref([]);
const selectedUaType = ref("random");
const uaOptions = ref([
	{ label: "Random (Any)", value: "random" },
	{ label: "Windows Desktop", value: "windows" },
	{ label: "macOS Desktop", value: "macos" },
	{ label: "iPhone Mobile", value: "iphone" },
	{ label: "Android Mobile", value: "android" },
]);
const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);


const collectionId = "media_players";

onMounted(async () => {
	isLoading.value = true;
	try {
		await authStore.initAuth();

		if (currentUser.value) {
			const proxyRes = await databases.listDocuments(DB_ID, "proxies");
			proxiesList.value = proxyRes.documents.map((doc) => ({
				id: doc.$id,
				name: doc.name,
				ipAddress: doc.ipAddress,
			}));

			const res = await databases.listDocuments(DB_ID, collectionId, [
				Query.equal("userId", currentUser.value.$id),
			]);

			players.value = res.documents.map((doc) => {
				const proxy = proxiesList.value.find((p) => p.id === doc.proxyId);
				return {
					id: doc.$id,
					youtubeUrls: doc.youtubeUrls,
					currentQueue: doc.currentQueue,
					userId: doc.userId,
					proxyId: doc.proxyId,
					proxyIp: proxy ? proxy.ipAddress : null,
					userAgent: doc.userAgent,
				};
			});
		}
	} catch (e) {
		console.error("Failed to fetch players", e);
	} finally {
		isLoading.value = false;
	}
});

const resetForm = () => {
	queueList.value = [""];
	formError.value = "";
	selectedProxyId.value = null;
	selectedUaType.value = "random";
};

const startPlayer = async () => {
	formError.value = "";

	const urls = queueList.value.map((u) => u.trim()).filter((u) => u);

	if (urls.length === 0) {
		formError.value = "Please provide at least one URL.";
		return;
	}

	for (const url of urls) {
		if (!ytRegex.test(url)) {
			formError.value = "Invalid YouTube URL: " + url;
			return;
		}
	}

	if (!currentUser.value) {
		formError.value = "You must be logged in to create a player.";
		return;
	}

	try {
		const uaType =
			selectedUaType.value === "random" ? null : selectedUaType.value;
		const uaString = generateUserAgent(uaType);

		const doc = await databases.createDocument(
			DB_ID,
			collectionId,
			ID.unique(),
			{
				youtubeUrls: urls,
				userId: currentUser.value.$id,
				currentQueue: 0,
				proxyId: selectedProxyId.value || null,
				userAgent: uaString,
			},
		);

		const proxy = proxiesList.value.find((p) => p.id === doc.proxyId);

		players.value.push({
			id: doc.$id,
			youtubeUrls: doc.youtubeUrls,
			userId: doc.userId,
			currentQueue: doc.currentQueue,
			proxyId: doc.proxyId,
			proxyIp: proxy ? proxy.ipAddress : null,
			userAgent: doc.userAgent,
		});

		isModalVisible.value = false;
		resetForm();
	} catch (e) {
		console.error(e);
		formError.value = "Failed to save player. " + e.message;
	}
};

const stopPlayer = async (id) => {
	try {
		await databases.deleteDocument(DB_ID, collectionId, id);
		players.value = players.value.filter((p) => p.id !== id);
	} catch (e) {
		console.error("Failed to delete player", e);
	}
};

const handleUpdateQueue = async (player, newQueue) => {
	player.currentQueue = newQueue;
	try {
		await databases.updateDocument(DB_ID, collectionId, player.id, {
			currentQueue: newQueue,
		});
	} catch (e) {
		console.error("Failed to update queue", e);
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

.players-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .players-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 4rem 2rem;
  background-color: var(--p-surface-900);
  border-radius: 8px;
  color: var(--p-surface-400);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  font-size: 3rem;
  color: var(--p-surface-500);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
