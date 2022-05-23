import { request } from "./generic.service";

export default class ProductService {
  static async getProduct(article) {
    return request({ url: `products/${article}`, method: "get" });
  }

  static async getProducts() {
    return request({ url: 'products', method: 'get' });
  }

  static async getProductsByCategory(categoryId) {
    return request({ url: `products/category/${categoryId}`, method: 'get' });
  }

  static async getProductsBySearch(searchText, searchCategoryId = '') {
    const encodedQuery = encodeURIComponent(searchText);

    if (!searchCategoryId.length) {
      return request({ url: `products/search?text=${encodedQuery}`, method: 'get' })
    } else {
      return request({ url: `products/search?category=${searchCategoryId}&text=${encodedQuery}`, method: 'get' });
    }
  }

  static async getFilteredProducts(filter) {
    return request({ url: `products/filter${filter}`, method: "get" });
  }

}