<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>Media Player</h1>
      <Button label="Create" icon="pi pi-plus" @click="isModalVisible = true" />
    </div>

    <div class="players-grid">
      <MediaPlayerCard 
        v-for="player in players" 
        :key="player.id" 
        :id="player.id"
        :name="player.name"
        :youtubeUrls="player.youtubeUrls"
        :currentQueue="player.currentQueue"
        @stop="stopPlayer"
        @update:currentQueue="(val) => handleUpdateQueue(player, val)"
      />
      <div v-if="players.length === 0" class="empty-state">
        <i class="pi pi-video empty-icon"></i>
        <p>No media players running. Create one to get started!</p>
      </div>
    </div>

    <Dialog v-model:visible="isModalVisible" modal header="Create New Media Player" :style="{ width: '500px' }" @hide="resetForm">
      <div class="url-inputs-container" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
        <FloatLabel variant="on" style="margin-bottom: 0.5rem;">
          <InputText id="player-name" v-model="playerName" style="width: 100%" autocomplete="off" />
          <label for="player-name">Player Name</label>
        </FloatLabel>
        
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
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import MediaPlayerCard from "./components/MediaPlayerCard.vue";
import { ytRegex } from "../../constants/validator.js";
import { account, databases, ID, Query } from "../../lib/appwrite.js";

const isModalVisible = ref(false);
const players = ref([]);
const playerName = ref("");
const queueList = ref([""]);
const formError = ref("");
const currentUser = ref(null);

const dbId = "6a31a1b80021df02203f";
const collectionId = "media_players";

onMounted(async () => {
	try {
		currentUser.value = await account.get();
		const res = await databases.listDocuments(dbId, collectionId, [
			Query.equal("userId", currentUser.value.$id),
		]);

		players.value = res.documents.map((doc) => ({
			id: doc.$id,
			name: doc.name,
			youtubeUrls: doc.youtubeUrls,
			currentQueue: doc.currentQueue,
			userId: doc.userId,
		}));
	} catch (e) {
		console.error("Not logged in or failed to fetch players", e);
	}
});

const resetForm = () => {
	playerName.value = "";
	queueList.value = [""];
	formError.value = "";
};

const startPlayer = async () => {
	formError.value = "";

	if (!playerName.value.trim()) {
		formError.value = "Please provide a player name.";
		return;
	}

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
		const doc = await databases.createDocument(
			dbId,
			collectionId,
			ID.unique(),
			{
				name: playerName.value.trim(),
				youtubeUrls: urls,
				userId: currentUser.value.$id,
				currentQueue: 0,
			},
		);

		players.value.push({
			id: doc.$id,
			name: doc.name,
			youtubeUrls: doc.youtubeUrls,
			userId: doc.userId,
			currentQueue: doc.currentQueue,
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
		await databases.deleteDocument(dbId, collectionId, id);
		players.value = players.value.filter((p) => p.id !== id);
	} catch (e) {
		console.error("Failed to delete player", e);
	}
};

const handleUpdateQueue = async (player, newQueue) => {
	player.currentQueue = newQueue;
	try {
		await databases.updateDocument(dbId, collectionId, player.id, {
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
