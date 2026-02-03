import { createRouter, createWebHistory } from 'vue-router'

import Main from '@/views/Main.vue'
import Home from '@/views/Home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '', name: 'main', component: Main, redirect: '/home',
      children: [
        {
        path: '/home', name: 'home', component: Home
        },
        {
          path: '/user', name: 'user', component: () => import('@/views/User/index.vue')
        },
        {
          path: '/goods', name: 'goods', component: () => import('@/views/Goods/index.vue')
        }
      ]
    }
  ],
})

export default router
