import Router, { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage';
import CatalogPage from '@/pages/catalog/CatalogPage';
import CatalogHalogenPage from '@/pages/catalog/CatalogHalogenPage';
import CatalogXenonPage from '@/pages/catalog/CatalogXenonPage';
import CatalogLedPage from '@/pages/catalog/CatalogLedPage';
import CatalogIncandescentPage from '@/pages/catalog/CatalogIncandescentPage';
import CartPage from '@/pages/CartPage';
import ProductPage from '@/pages/ProductPage';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage
  },
  {
    path: '/catalog',
    component: CatalogPage,
    name: "catalog",
    props: true
  },
  {
    path: '/catalog/halogen',
    component: CatalogHalogenPage,
    name: "catalog-halogen",
    props: true
  },
  {
    path: '/catalog/xenon',
    component: CatalogXenonPage,
    name: "catalog-xenon",
    props: true
  },
  {
    path: '/catalog/led',
    component: CatalogLedPage,
    name: "catalog-led",
    props: true
  },
  {
    path: '/catalog/incandescent',
    component: CatalogIncandescentPage,
    name: "catalog-incandescent",
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
    component: CartPage,
    name: "cart",
    props: true
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router