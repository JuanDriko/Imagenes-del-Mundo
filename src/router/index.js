import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Contest from '@/views/Contest.vue';

const router = createRouter({
  history: createWebHistory('/iamgealegra/'),
  routes: [
    {
      path: '/iamgealegra/',
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

