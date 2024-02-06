import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Contest from '@/views/Contest.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Contest/',
      name: 'Contest',
      component: Contest
    },
  ]
});

export default router;

