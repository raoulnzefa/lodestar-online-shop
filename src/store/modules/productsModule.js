import axios from 'axios';

export const productsModule = {
  state: () => ({
    products: [],
    isProductsLoading: false,
    filteredProducts: [],
  }),
  getters: {
    PRODUCTS(state) {
      return state.products;
    },
    LOADING(state) {
      return state.isProductsLoading;
    },
    FILTERED_PRODUCTS(state) {
      return state.filteredProducts;
    },

  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products;
    },
    SET_LOADING: (state, bool) => {
      state.isProductsLoading = bool;
    },
    SET_FILTERED_PRODUCTS: (state, products) => {
      state.filteredProducts = products;
    },
  },
  actions: {
    async GET_PRODUCTS_FROM_API({ commit }) {
      try {
        commit('SET_LOADING', true);
        const response = await axios('http://localhost:3000/products', {
          method: "GET"
        });
        response.data.forEach(product => product.article = product.article.split("/").join('_')); // replace "/" with "_" for routing
        commit('SET_PRODUCTS', response.data);
        return this.products;
      } catch (err) {
        console.log(err)
        return err
      } finally {
        commit('SET_LOADING', false);
      }
    },
    SET_FILTERED_PRODUCTS({ commit }, products) {
      commit('SET_FILTERED_PRODUCTS', products)
    },
  },
}