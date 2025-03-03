import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/home.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/about.vue'),
  },
  {
    path: '/rain',
    name: 'rain',
    component: () => import('../views/rain/rain.vue'),
  },
  {
    path: '/particle',
    name: 'particle',
    component: () => import('../views/particle/particle.vue'),
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/upload/upload.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
