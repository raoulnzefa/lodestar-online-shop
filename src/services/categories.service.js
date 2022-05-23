import { request } from "./generic.service";

export default class CategoryService {
  static async getCategory(id) {
    return request({ url: `categories/${id}`, method: "get" });
  }

  static async getCategories() {
    return request({ url: 'categories', method: 'get' });
  }
}
