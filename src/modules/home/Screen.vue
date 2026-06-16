<template>
  <div class="screen-container">
    <div class="header-actions">
      <h1>Home Page</h1>
      <Button label="Create New Media Player" icon="pi pi-plus" @click="isModalVisible = true" />
    </div>

    <div class="players-grid">
      <MediaPlayerCard 
        v-for="player in players" 
        :key="player.id" 
        :id="player.id"
        :initialQueue="player.queue"
        @stop="stopPlayer"
      />
      <div v-if="players.length === 0" class="empty-state">
        <i class="pi pi-video empty-icon"></i>
        <p>No media players running. Create one to get started!</p>
      </div>
    </div>

    <Dialog v-model:visible="isModalVisible" modal header="Create New Media Player" :style="{ width: '500px' }" @hide="resetForm">
      <div class="url-inputs-container" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 0.5rem;">
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
        <Button label="Create Media Player" @click="startPlayer" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import MediaPlayerCard from './components/MediaPlayerCard.vue'

const isModalVisible = ref(false)
const players = ref([])
const queueList = ref([''])
const formError = ref('')

const resetForm = () => {
  queueList.value = ['']
  formError.value = ''
}

const startPlayer = () => {
  formError.value = '';
  const urls = queueList.value.map(u => u.trim()).filter(u => u);
  
  if (urls.length === 0) {
    formError.value = 'Please provide at least one URL.';
    return;
  }
  
  const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/;
  for (const url of urls) {
    if (!ytRegex.test(url)) {
      formError.value = 'Invalid YouTube URL: ' + url;
      return;
    }
  }

  players.value.push({
    id: crypto.randomUUID(),
    queue: urls
  })
  
  isModalVisible.value = false;
  queueList.value = ['']; // Reset for next time
}

const stopPlayer = (id) => {
  players.value = players.value.filter(p => p.id !== id)
}
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
