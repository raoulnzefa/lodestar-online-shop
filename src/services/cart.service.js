import { request } from './generic.service';

export default class CartService {
  static async getCart(id) {
    return request({ url: `carts/${id}`, method: "get" })
  };

  static async incrementCartItem(cartId, productId) {
    return request({
      url: `carts/increment`,
      method: 'put',
      data: {
        cartId,
        productId
      }
    })
  }

  static async decrementCartItem(cartId, productId) {
    return request({
      url: `carts/decrement`,
      method: 'put',
      data: {
        cartId,
        productId
      }
    })
  }

  static async deleteCartItem(cartId, productId) {
    return request({
      url: `carts/delete`,
      method: 'put',
      data: {
        cartId,
        productId
      }
    })
  }

  static async addCartItem(cartId, productId) {
    return request({
      url: `carts/add`,
      method: 'put',
      data: {
        cartId,
        productId
      }
    })
  }

  static async deleteAllFromCart(cartId) {
    return request({ url: 'carts/deleteAll', method: "put", data: { cartId } });
  }
}
