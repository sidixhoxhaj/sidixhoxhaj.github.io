import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'AboutMe',
    component: () => import('@/views/AboutMe.vue')
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import('@/views/Portfolio.vue')
  },
  {
    path: '/portfolio/:slug',
    name: 'PortfolioDetail',
    component: () => import('@/views/PortfolioDetail.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogDetail',
    component: () => import('@/views/BlogDetail.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
