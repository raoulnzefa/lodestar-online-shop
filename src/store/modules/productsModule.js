import axios from 'axios';

export const productsModule = {
  state: () => ({
    products: [],
    filteredProducts: [],
    isProductsLoading: false,
    isProductsFound: true,
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
    IS_FOUND(state) {
      return state.isProductsFound;
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
      const search = rootState.search.searchForm;

      [...state.products].map((product) => {
        if (search.category == "Все категории") {
          result = [...state.products]
        } else if (product.category == search.category) {
          result.push(product);
        }
      });

      /* filter products by name */
      let filteredResult = result
        .filter(item => item.name.toLowerCase()
          .includes(search.text
            .toLowerCase()));

      /* Filter products by article */
      if (!filteredResult.length) {
        filteredResult = result
          .filter(item => item.article.toLowerCase()
            .includes(search.text
              .toLowerCase()))
      }

      /* Filter products by tags */
      const tags = rootState.search.tags;
      if (tags.length) {
        filteredResult = [];

        // find all suitable products by tag
        result.map(product => {
          for (let tag of tags) {
            if (product.series === tag.name || product.subseries === tag.name) {
              if (!filteredResult.includes(product)) filteredResult.push(product)
            }
          }
        })

        // find products that has to be deleted
        for (let tag of tags) {
          for (let i = 0; i < filteredResult.length; i++) {
            if (filteredResult[i].series.toLowerCase() !== tag.name.toLowerCase() && filteredResult[i].subseries.toLowerCase() !== tag.name.toLowerCase()) {
              filteredResult[i].delete = true
            }
          }
        }

        // delete products
        filteredResult = filteredResult.filter(product => !product.delete)
      }

      commit('SET_FILTERED_PRODUCTS', filteredResult);
      filteredResult.length ? commit("SET_FOUND", true) : commit("SET_FOUND", false);
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
    },
    SET_FOUND: (state, bool) => {
      state.isProductsFound = bool;
    }
  },

}