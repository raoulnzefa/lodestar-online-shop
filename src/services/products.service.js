import { request } from "./generic.service";

const getProduct = (article) => request({ url: `products/${article}`, method: "get" });
const getProducts = () => request({ url: 'products', method: 'get' });
const getProductsByCategory = (categoryId) => request({ url: `products/category/${categoryId}`, method: 'get' });

// search query
const getProductsBySearch = (searchText, searchCategoryId = '') => {
  let encodedQuery = encodeURIComponent(searchText);

  if (!searchCategoryId.length) {
    return request({ url: `products/search?text=${encodedQuery}`, method: 'get' })
  } else {
    return request({ url: `products/search?category=${searchCategoryId}&text=${encodedQuery}`, method: 'get' });
  }
}

// filtration
const getFilteredProducts = (filter) => request({ url: `products/filter${filter}`, method: "get" });

export {
  getProduct,
  getProducts,
  getProductsByCategory,
  getProductsBySearch,
  getFilteredProducts
};