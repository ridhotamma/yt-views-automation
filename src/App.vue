<template>
  <div id="app-layout">
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
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isCollapsed = ref(window.innerWidth <= 1024)

const handleResize = () => {
  if (window.innerWidth <= 1024) {
    isCollapsed.value = true
  } else {
    isCollapsed.value = false
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
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
</style>
