import { createRouter, createWebHistory } from 'vue-router'
import MediaPlayerScreen from '../modules/media-player/Screen.vue'
import ProxyScreen from '../modules/proxy/Screen.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'media-player',
      component: MediaPlayerScreen
    },
    {
      path: '/proxy',
      name: 'proxy',
      component: ProxyScreen
    }
  ]
})

export default router
