import axios from 'axios';

export const productsModule = {
  state: () => ({
    products: []
  }),
  getters: {
    PRODUCTS(state) {
      return state.products;
    }
  },
  actions: {
    GET_PRODUCTS_FROM_API({ commit }) {
      return axios('http://localhost:3000/products', {
        method: "GET"
      })
        .then(products => {
          commit('SET_PRODUCTS', products.data);
          return products;
        })
        .catch((err) => {
          console.log(err)
          return err
        })
    }
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    }
  }
}