import axios from 'axios';

export const productsModule = {
  state: () => ({
    products: [],
    filteredProducts: [],
    isProductsLoading: false,
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
    FILTER_PRODUCTS({ commit, state, rootState }) {
      let result = [];

      [...state.products].map((product) => {
        if (rootState.search.searchForm.category == "Все категории") {
          result = [...state.products]
        } else if (product.category == rootState.search.searchForm.category) {
          result.push(product);
        }
      });

      commit('SET_FILTERED_PRODUCTS', result);
    }
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
    }
  },

}