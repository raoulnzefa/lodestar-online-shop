export const searchModule = {
  state: () => ({
    searchForm: {
      category: "Все категории",
      text: "",
    },
    categories: [
      {
        name: "Все категории",
        value: "Все категории",
        path: '/catalog'
      },
      {
        name: "Галогенные",
        value: "Галогенные лампы",
        path: '/catalog/halogen'
      },
      {
        name: "Ксеноновые",
        value: "Ксеноновые лампы",
        path: '/catalog/xenon'
      },
      {
        name: "Светодиодные",
        value: "Светоизлучающие диоды",
        path: '/catalog/led'
      },
      {
        name: "Накал",
        value: "Лампы накаливания",
        path: '/catalog/incandescent'
      },
    ],
    selected: "Все категории",
    isProductsFound: true,
    tags: [],
  }),
  getters: {
    SEARCH_FORM(state) {
      return state.searchForm;
    },
    CATEGORIES(state) {
      return state.categories;
    },
    SELECTED(state) {
      return state.selected;
    },
    TAGS(state) {
      return state.tags
    },
    IS_FOUND(state) {
      return state.isProductsFound;
    }
  },
  mutations: {
    SET_SEARCH_CATEGORY(state, category) {
      state.searchForm.category = category;
    },
    SET_SEARCH_TEXT(state, text) {
      state.searchForm.text = text;
    },
    SET_CATEGORIES(state, categoryObj) {
      state.categories.push(categoryObj);
    },
    SET_TAGS(state, tag) {
      state.tags.push({ name: tag, id: Date.now(), showDeleteButton: false });
    },
    DEL_TAG(state, index) {
      state.tags.splice(index, 1);
    },
    DEL_ALL_TAGS(state) {
      state.tags.splice(0, state.tags.length);
    },
    SET_SHOW_TAG_DELETE_BUTTON(state, { index, bool }) {
      state.tags[index].showDeleteButton = bool
    },
    SET_FOUND: (state, bool) => {
      state.isProductsFound = bool;
    }
  },
  actions: {
    ADD_CATEROGY({ commit }, categoryObj) {
      commit('SET_CATEGORIES', categoryObj);
    },
    CHANGE_SEARCH_CATEGORY({ commit }, category) {
      commit('SET_SEARCH_CATEGORY', category);
    },
    CHANGE_SEARCH_TEXT({ commit }, text) {
      commit('SET_SEARCH_TEXT', text);
    },
    ADD_TAG({ commit, state }, tag) {
      if (state.tags.length) {
        let exists = state.tags.find(item => item.name === tag);
        if (exists) {
          console.log('Tag already exists');
          return
        } else {
          commit("SET_TAGS", tag);
        }
      } else {
        commit("SET_TAGS", tag);
      }
    },
    REMOVE_TAG({ commit }, index) {
      commit('DEL_TAG', index);
    },
    REMOVE_ALL_TAGS({ commit }) {
      commit("DEL_ALL_TAGS");
    },
    SHOW_TAG_DELETE_BUTTON({ commit, state }, { index, bool }) {
      if (state.tags[index]) commit('SET_SHOW_TAG_DELETE_BUTTON', { index, bool });
    },
    FILTER_PRODUCTS({ commit, state, rootState }) {
      let result = [];
      const products = rootState.products.products;

      [...products].map((product) => {
        if (state.searchForm.category == "Все категории") {
          result = [...products]
        } else if (product.category == state.searchForm.category) {
          result.push(product);
        }
      });

      /* filter products by name */
      let filteredResult = result
        .filter(item => item.name.toLowerCase()
          .includes(state.searchForm.text
            .toLowerCase()));

      /* Filter products by article */
      let filterArticle = result
        .filter(item => item.article.toLowerCase()
          .includes(state.searchForm.text
            .toLowerCase()));
      filterArticle.forEach(product => {
        if (!filteredResult.includes(product)) {
          filteredResult.push(product)
        }
      })


      /* Filter products by tags */ // ! Can be written with faster algorithm
      const tags = state.tags;
      if (tags.length) {
        filteredResult = [];

        // find all suitable products by tag
        for (let tag of tags) {
          result.map(product => {
            if (product.series === tag.name || product.subseries === tag.name) {
              if (!filteredResult.includes(product)) {
                product.delete = false;
                filteredResult.push(product)
              }
            }
          })
        }

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

      commit('SET_FILTERED_PRODUCTS', filteredResult, { root: true });
      filteredResult.length ? commit("SET_FOUND", true) : commit("SET_FOUND", false);
    }
  }
}