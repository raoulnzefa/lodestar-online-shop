import axios from 'axios';

export const productsModule = {
  state: () => ({
    products: [],
    isProductsLoading: false,
  }),
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    LOADING(state) {
      return state.isProductsLoading;
    }
  },
  actions: {
    async GET_PRODUCTS_FROM_API({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await axios('http://localhost:3000/products', {
          method: "GET"
        });
        commit('SET_PRODUCTS', response.data);
        return products;
      } catch (err) {
        console.log(err)
        return err
      } finally {
        commit('SET_LOADING', false);
      }
    }
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_LOADING: (state, bool) => {
      state.isProductsLoading = bool;
    }
  }
}