<template>
  <div class="player-card">
    <!-- Top Section: Webview -->
    <div class="webview-container" v-if="currentVideo && isProxyReady">
      <webview 
        ref="webviewRef"
        :partition="partitionName"
        :useragent="userAgent"
        style="width: 100%; height: 100%; border: none;"
        webpreferences="autoplayPolicy=no-user-gesture-required"
        @dom-ready="onDomReady"
      ></webview>
    </div>
    <div class="webview-container empty-bg" v-else>
      <i class="pi pi-video" style="font-size: 2rem; color: var(--p-surface-500);"></i>
    </div>

    <!-- Bottom Section: Controls -->
    <div class="controls-bar">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <div class="queue-info" v-tooltip.top="'View upcoming videos'" @click="isQueueModalVisible = true">
          <i class="pi pi-list"></i>
          <span>Queue: {{ youtubeUrls.length - currentQueue }} left</span>
        </div>
        <div v-if="userAgent" class="queue-info" v-tooltip.top="userAgent" style="cursor: help;">
          <i class="pi pi-desktop"></i>
          <span>Spoofed</span>
        </div>
      </div>
      <Button 
        icon="pi pi-trash" 
        severity="danger" 
        text
        rounded 
        aria-label="Delete Player"
        v-tooltip.top="'Delete Player'"
        @click="confirmDelete" 
      />
    </div>

    <!-- Queue Modal -->
    <Dialog v-model:visible="isQueueModalVisible" modal header="Upcoming Videos" :style="{ width: '450px' }">
      <ul class="queue-list" v-if="youtubeUrls.length > 0">
        <li v-for="(video, index) in youtubeUrls" :key="index" class="queue-item" :class="{ 'active-item': index === currentQueue, 'played-item': index < currentQueue }">
          <i v-if="index === currentQueue" class="pi pi-play" style="margin-right: 0.5rem; color: var(--p-primary-color);"></i>
          <i v-else-if="index < currentQueue" class="pi pi-check" style="margin-right: 0.5rem; color: var(--p-green-500);"></i>
          <span v-else style="margin-right: 0.5rem; opacity: 0.5;">{{ index + 1 }}.</span>
          {{ video }}
        </li>
      </ul>
      <p v-else style="text-align: center; color: var(--p-surface-500); padding: 2rem 0;">No upcoming videos in queue.</p>
    </Dialog>

    <!-- Delete Confirmation Modal -->
    <Dialog v-model:visible="isDeleteModalVisible" modal header="Confirm Delete" :style="{ width: '350px' }">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span>Are you sure you want to delete this media player?</span>
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="isDeleteModalVisible = false" autofocus />
        <Button label="Yes" icon="pi pi-check" severity="danger" @click="proceedDelete" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const props = defineProps({
	id: String,
	youtubeUrls: Array,
	currentQueue: Number,
	proxyIp: String,
	userAgent: String,
});

const emit = defineEmits(["stop", "update:currentQueue"]);

const currentIndex = ref(props.currentQueue || 0);
const currentVideo = computed(
	() => props.youtubeUrls[currentIndex.value] || null,
);

const isQueueModalVisible = ref(false);
const isDeleteModalVisible = ref(false);
const isProxyReady = ref(false);
const webviewRef = ref(null);

const partitionName = computed(() => `persist:player-${props.id}`);

watch(currentVideo, (newVideo) => {
	if (newVideo && webviewRef.value) {
		webviewRef.value.src = newVideo;
	}
});
onMounted(async () => {
	if (props.proxyIp && window.ipcRenderer) {
		try {
			await window.ipcRenderer.invoke(
				"set-proxy",
				partitionName.value,
				props.proxyIp,
			);
		} catch (err) {
			console.error("Failed to set proxy", err);
		}
	}
	isProxyReady.value = true;
	
	nextTick(() => {
		if (webviewRef.value && currentVideo.value) {
			webviewRef.value.src = currentVideo.value;
		}
	});
});

const playNext = () => {
	if (currentIndex.value < props.youtubeUrls.length) {
		currentIndex.value++;
		emit("update:currentQueue", currentIndex.value);
	}
};

const onDomReady = async (event) => {
	const webview = event.target;

	const script = `
    (async () => {
      try {
        const video = document.querySelector('video');
        if (video) video.muted = true;

        const playBtn = document.querySelector('.ytp-play-button.ytp-button');
        if (playBtn && playBtn.title.includes('Play')) playBtn.click();

      } catch(e) {}

      return new Promise(resolve => {
        const interval = setInterval(() => {
          try {
            // Auto skip ads if the button appears
            const skipBtn = document.querySelector('.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button');
            if (skipBtn) skipBtn.click();

            const player = document.querySelector('.html5-video-player');
            const video = document.querySelector('video');
            
            if (player && video) {
              const isAd = player.classList.contains('ad-showing');
              const isEnded = player.classList.contains('ended-mode');
              
              if (isEnded && !isAd) {
                // Verify we are actually at the end of the main video
                const timeRemaining = video.duration - video.currentTime;
                if (isNaN(timeRemaining) || timeRemaining < 5) {
                  clearInterval(interval);
                  resolve('ENDED');
                }
              }
            }
          } catch(e) {}
        }, 2000);
      });
    })()
  `;

	try {
		const result = await webview.executeJavaScript(script);
		if (result === "ENDED") playNext();
	} catch (err) {
		console.error("Webview script error:", err);
	}
};

const confirmDelete = () => {
	isDeleteModalVisible.value = true;
};

const proceedDelete = () => {
	isDeleteModalVisible.value = false;
	emit("stop", props.id);
};
</script>

<style scoped>
.player-card {
  display: flex;
  flex-direction: column;
  height: 360px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  background-color: var(--p-surface-900);
}

.webview-container {
  flex: 1;
  position: relative;
  background-color: #000;
}

.empty-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--p-surface-800);
}

.controls-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--p-surface-900);
  border-top: 1px solid var(--p-surface-800);
  height: 50px;
}

.queue-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--p-surface-300);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: color 0.2s;
}

.queue-info:hover {
  color: var(--p-primary-color);
}

.queue-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.queue-item {
  word-break: break-all;
  color: var(--p-surface-200);
  font-size: 0.9rem;
  padding: 0.75rem;
  background-color: var(--p-surface-800);
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.active-item {
  background-color: rgba(var(--p-primary-color-rgb), 0.1);
  border: 1px solid var(--p-primary-color);
  font-weight: 600;
}

.played-item {
  opacity: 0.6;
}
</style>
