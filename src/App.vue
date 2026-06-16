<template>
  <div v-if="['login'].includes($route.name)" class="full-screen">
    <router-view />
  </div>

  <div v-else id="app-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ collapsed: isCollapsed }">
      <div class="sidebar-header">
        <img src="/images/logo.png" alt="Logo" class="app-logo" :class="{ 'collapsed': isCollapsed }" />
        <span v-if="!isCollapsed" class="brand-title font-britney">Youtumate</span>
      </div>

      <button class="toggle-btn" @click="isCollapsed = !isCollapsed" v-tooltip.right="isCollapsed ? 'Expand' : 'Collapse'">
        <i :class="isCollapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"></i>
      </button>

      <div class="sidebar-menu">
        <router-link to="/" class="menu-item" v-tooltip.right="isCollapsed ? 'Media Player' : ''" active-class="active">
          <i class="pi pi-video menu-icon"></i>
          <span v-if="!isCollapsed" class="menu-label">Media Player</span>
        </router-link>
        
        <router-link to="/proxy" class="menu-item" v-tooltip.right="isCollapsed ? 'Proxy List' : ''" active-class="active">
          <i class="pi pi-list menu-icon"></i>
          <span v-if="!isCollapsed" class="menu-label">Proxy List</span>
        </router-link>
      </div>

      <div style="flex-grow: 1;"></div>

      <div class="sidebar-footer">
        <div class="user-profile" @click="togglePopover" :class="{ 'collapsed': isCollapsed }" v-if="currentUser">
          <img :src="'https://ui-avatars.com/api/?name=' + encodeURIComponent(currentUser.name || 'User') + '&background=random'" alt="Avatar" class="user-avatar" />
          <div class="user-info" v-if="!isCollapsed">
            <span class="user-name">{{ currentUser.name }}</span>
            <span class="user-email">{{ currentUser.email }}</span>
          </div>
        </div>
      </div>
    </aside>

    <Popover ref="popover">
      <div style="display: flex; flex-direction: column; gap: 0.5rem; min-width: 150px;">
        <a href="#" class="popover-item logout-btn" @click.prevent="confirmLogout">
          <i class="pi pi-sign-out"></i>
          <span>Logout</span>
        </a>
      </div>
    </Popover>

    <Dialog v-model:visible="isLogoutModalVisible" modal header="Confirm Logout" :style="{ width: '400px' }">
      <p class="m-0">Are you sure you want to logout from your account?</p>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text severity="secondary" @click="isLogoutModalVisible = false" autofocus />
        <Button label="Logout" icon="pi pi-sign-out" severity="danger" @click="proceedLogout" />
      </template>
    </Dialog>

    <!-- Main Content -->
    <main class="main-content">
      <MediaPlayerScreen v-show="$route.name === 'media-player'" />
      <router-view v-show="$route.name !== 'media-player'" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { account } from "./lib/appwrite";
import { useAuthStore } from "./store/auth";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Popover from "primevue/popover";
import MediaPlayerScreen from "./modules/media-player/Screen.vue";

const router = useRouter();
const route = useRoute();
const isCollapsed = ref(window.innerWidth <= 1024);
const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);

const popover = ref();
const isLogoutModalVisible = ref(false);

const handleResize = () => {
	if (window.innerWidth <= 1024) {
		isCollapsed.value = true;
	} else {
		isCollapsed.value = false;
	}
};

const togglePopover = (event) => {
	popover.value.toggle(event);
};

const confirmLogout = () => {
	isLogoutModalVisible.value = true;
	popover.value.hide();
};

const proceedLogout = async () => {
	try {
		await account.deleteSession("current");
		authStore.clearUser();
		isLogoutModalVisible.value = false;
		router.push("/login");
	} catch (err) {
		console.error("Logout failed", err);
	}
};

onMounted(async () => {
	window.addEventListener("resize", handleResize);
	await authStore.initAuth();
});

onUnmounted(() => {
	window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
#app-layout {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  width: 100%;
}

.sidebar {
  width: 250px;
  background-color: var(--p-surface-900, #1a1a1a);
  color: var(--p-surface-0, #fff);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  border-right: 1px solid var(--p-surface-700, #333);
  position: relative;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 70px;
  position: relative;
  border-bottom: 1px solid var(--p-surface-700, #333);
  overflow: hidden;
}

.font-britney {
  font-family: 'Britney', cursive;
}

.brand-title {
  font-weight: 700;
  font-size: 1.5rem;
  white-space: nowrap;
  color: var(--p-primary-500, #ef4444);
}

.app-logo {
  height: 40px;
  width: 40px;
  object-fit: contain;
  margin-right: 0.75rem;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.app-logo.collapsed {
  margin-right: 0;
  margin: 0 auto;
}

.toggle-btn {
  position: absolute;
  right: -12px;
  top: 35px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--p-primary-500, #ef4444);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.toggle-btn:hover {
  background-color: var(--p-primary-400, #f87171);
}

.sidebar-menu {
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  gap: 0.5rem;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: var(--p-surface-400, #aaa);
  text-decoration: none;
  transition: all 0.2s;
  overflow: hidden;
  white-space: nowrap;
}

.menu-item:hover {
  background-color: var(--p-surface-800, #2a2a2a);
  color: var(--p-surface-0, #fff);
}

.menu-item.active {
  background-color: var(--p-primary-900, #450a0a);
  color: var(--p-primary-400, #f87171);
  border-right: 3px solid var(--p-primary-500, #ef4444);
}

.menu-icon {
  font-size: 1.25rem;
  margin-right: 1.25rem;
  flex-shrink: 0;
}

.sidebar.collapsed .menu-item {
  justify-content: center;
  padding: 0.75rem 0;
}

.sidebar.collapsed .menu-icon {
  margin-right: 0;
}

.main-content {
  flex: 1;
  background-color: var(--p-surface-950, #121212);
  overflow-y: auto;
}

.global-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  background-color: var(--p-surface-950, #121212);
  color: var(--p-primary-500, #ef4444);
}

.full-screen {
  width: 100%;
  min-height: 100vh;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--p-surface-700, #333);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-profile:hover {
  background-color: var(--p-surface-800, #2a2a2a);
}

.user-profile.collapsed {
  justify-content: center;
  padding: 0.5rem 0;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-name {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--p-surface-0, #fff);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.75rem;
  color: var(--p-surface-400, #aaa);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.popover-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.popover-item:hover {
  background-color: var(--p-surface-100, #f3f4f6);
}

.logout-btn {
  color: var(--p-red-500, #ef4444);
}

.logout-btn:hover {
  background-color: var(--p-surface-800, #2a2a2a);
}
</style>
