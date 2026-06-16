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

    <Dialog v-model:visible="isModalVisible" modal header="Create New Media Player" :style="{ width: '500px' }">
      <div class="form-group">
        <label for="urls">YouTube Video URLs (one per line):</label>
        <Textarea id="urls" v-model="urlsInput" rows="5" autoResize style="width: 100%" placeholder="https://youtube.com/watch?v=..." />
      </div>
      <template #footer>
        <Button label="Cancel" text severity="secondary" @click="isModalVisible = false" autofocus />
        <Button label="Start Player" @click="startPlayer" :disabled="!urlsInput.trim()" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Textarea from 'primevue/textarea'
import MediaPlayerCard from './components/MediaPlayerCard.vue'

const isModalVisible = ref(false)
const urlsInput = ref('')
const players = ref([])

const startPlayer = () => {
  if (!urlsInput.value.trim()) return
  
  const urls = urlsInput.value.split('\n').map(u => u.trim()).filter(u => u)
  if (urls.length > 0) {
    players.value.push({
      id: crypto.randomUUID(),
      queue: urls
    })
    urlsInput.value = ''
    isModalVisible.value = false
  }
}

const stopPlayer = (id) => {
  players.value = players.value.filter(p => p.id !== id)
}
</script>

<style scoped>
.screen-container {
  padding: 2rem;
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
