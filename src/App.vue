<template>
  <div id="app-layout">
    <nav class="top-nav">
      <router-link to="/" class="nav-brand">App</router-link>
      <div class="nav-links">
        <router-link to="/">Home</router-link>
        <router-link to="/proxy">Proxy List</router-link>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
#app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.top-nav {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
}
.nav-brand {
  font-weight: bold;
  font-size: 1.25rem;
  margin-right: 2rem;
  color: #fff;
  text-decoration: none;
}
.nav-links {
  display: flex;
  gap: 1.5rem;
}
.nav-links a {
  color: #aaa;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-links a:hover,
.nav-links a.router-link-active {
  color: #fff;
}
.main-content {
  flex: 1;
}
</style>
