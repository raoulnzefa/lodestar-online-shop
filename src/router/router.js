import Router, { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main';
import Catalog from '@/pages/Catalog';
import Cart from '@/pages/Cart';
import ProductPage from '@/pages/ProductPage';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/catalog',
    component: Catalog,
    name: "catalog",
    props: true
  },
  {
    path: '/catalog/:article',
    component: ProductPage,
    name: "product-page",
    props: true
  },
  {
    path: '/cart',
    component: Cart,
    name: "cart",
    props: true
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router