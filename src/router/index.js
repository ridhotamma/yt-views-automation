import { createRouter, createWebHistory } from 'vue-router'
import HomeScreen from '../modules/home/Screen.vue'
import ProxyScreen from '../modules/proxy/Screen.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeScreen
    },
    {
      path: '/proxy',
      name: 'proxy',
      component: ProxyScreen
    }
  ]
})

export default router
