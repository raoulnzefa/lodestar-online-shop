import { request } from "./generic.service";

export default class UserFeaturesService {
  // WISHLIST
  static async getWishlist(listId) {
    return request({ url: `wishlist/${listId}`, method: "get" });
  }

  static async addWishlistItem(listId, itemId) {
    return request({ url: `wishlist/add`, method: "put", data: { listId, itemId } });
  }

  static async removeWishlistItem(listId, itemId) {
    return request({ url: `wishlist/remove`, method: "put", data: { listId, itemId } });
  }

  static async removeAllWishlistItems(listId) {
    return request({ url: 'wishlist/removeAll', method: 'put', data: { listId } });
  }

  // ORDERS
  static async getOrdersByUser(userId) {
    return request({ url: `orders/byuser/${userId}`, method: 'get' });
  }

  static async createOrder(userId, products, orderData, userData) {
    return request({ url: 'orders/create', method: "post", data: { userId, products, orderData, userData } })
  }
}


