<template>
  <div class="player-card">
    <!-- Embedded Webview Background -->
    <div class="video-background" v-if="currentVideo">
      <webview 
        :src="currentVideo" 
        style="width: 100%; height: 100%; border: none;"
        allowpopups
        webpreferences="autoplayPolicy=no-user-gesture-required"
        @dom-ready="onDomReady"
      ></webview>
    </div>
    <div class="video-background empty-bg" v-else>
      <i class="pi pi-video" style="font-size: 2rem; color: var(--p-surface-500);"></i>
    </div>

    <!-- Black Gradient Overlay (pointer-events: none lets clicks pass through to webview) -->
    <div class="gradient-overlay"></div>

    <!-- Top Right Actions -->
    <div class="top-right-actions">
      <div class="queue-badge" v-tooltip.top="'Videos remaining in queue'">
        <i class="pi pi-list"></i>
        <span>{{ queue.length }}</span>
      </div>
      <Button 
        icon="pi pi-trash" 
        severity="danger" 
        rounded 
        aria-label="Delete Player"
        v-tooltip.top="'Delete Player'"
        @click="confirmDelete" 
        :disabled="status === 'finished' || status === 'error'" 
      />
    </div>

    <!-- Bottom Content (pointer-events: none lets clicks pass through if overlapping) -->
    <div class="bottom-content">
      <div class="status-row">
        <span class="player-title">Player Instance</span>
        <Tag :value="status" :severity="getStatusSeverity(status)" />
      </div>
      <p class="current-video truncate" :title="currentVideo">
        {{ currentVideo || 'No active video' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const props = defineProps({
  id: String,
  initialQueue: Array
})

const emit = defineEmits(['stop'])

const queue = ref([...props.initialQueue])
const currentVideo = ref(null)
const status = ref('starting')

const playNext = () => {
  if (queue.value.length === 0) {
    status.value = 'finished'
    currentVideo.value = null
    return
  }
  currentVideo.value = queue.value.shift()
  status.value = 'running'
}

onMounted(() => {
  playNext()
})

const onDomReady = async (event) => {
  const webview = event.target;
  
  // Script injected into the webview to automate YouTube playback
  const script = `
    (async () => {
      // Attempt to click play bypassing strict autoplay
      try {
        const playBtn = document.querySelector('.ytp-play-button.ytp-button');
        if (playBtn && playBtn.title.includes('Play')) {
           playBtn.click();
        }
      } catch(e) {}

      // Poll for the player to reach ended-mode natively
      return new Promise(resolve => {
        const interval = setInterval(() => {
          const player = document.querySelector('.html5-video-player.ended-mode');
          if (player) {
            clearInterval(interval);
            resolve('ENDED');
          }
        }, 2000);
      });
    })()
  `;
  
  try {
    const result = await webview.executeJavaScript(script);
    if (result === 'ENDED') {
      playNext();
    }
  } catch (err) {
    console.error("Webview script error:", err);
  }
}

const confirmDelete = () => {
  if (window.confirm("Are you sure you want to delete this media player?")) {
    emit('stop', props.id)
  }
}

const getStatusSeverity = (status) => {
  switch (status) {
    case 'running': return 'success'
    case 'starting': return 'info'
    case 'finished': return 'secondary'
    case 'error': return 'danger'
    default: return 'info'
  }
}
</script>

<style scoped>
.player-card {
  position: relative;
  height: 320px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: var(--p-surface-900);
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.empty-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--p-surface-800);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%);
  pointer-events: none;
}

.top-right-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.queue-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  padding: 0.4rem 0.75rem;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.bottom-content {
  position: relative;
  z-index: 2;
  padding: 1.25rem;
  pointer-events: none;
}

.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.player-title {
  font-weight: 600;
  color: white;
  font-size: 1.1rem;
}

.current-video {
  margin: 0;
  color: var(--p-surface-300);
  font-size: 0.85rem;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
