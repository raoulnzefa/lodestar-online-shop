export const catalogPages = [
  {
    path: '/catalog',
    component: () => import('@/pages/catalog/CatalogPage'),
    name: "catalog",
    props: true
  },
  {
    path: '/catalog/filter',
    component: () => import('@/pages/catalog/CatalogFilteredPage'),
    name: "catalog-filtered",
    props: true
  },
  {
    path: '/catalog/halogen',
    component: () => import('@/pages/catalog/CatalogHalogenPage'),
    name: "catalog-halogen",
  },
  {
    path: '/catalog/xenon',
    component: () => import('@/pages/catalog/CatalogXenonPage'),
    name: "catalog-xenon",
  },
  {
    path: '/catalog/led',
    component: () => import('@/pages/catalog/CatalogLedPage'),
    name: "catalog-led",
  },
  {
    path: '/catalog/incandescent',
    component: () => import('@/pages/catalog/CatalogIncandescentPage'),
    name: "catalog-incandescent",
  },
  {
    path: '/catalog/accessories',
    component: () => import('@/pages/catalog/CatalogAccessoriesPage'),
    name: "catalog-accessories",
  },
  {
    path: '/catalog/autoelectric',
    component: () => import('@/pages/catalog/CatalogAutoelectricPage'),
    name: "catalog-autoelectric",
  },
  {
    path: '/catalog/:article',
    component: () => import('@/pages/ProductPage'),
    name: "product-page",
    props: true,
  }
]