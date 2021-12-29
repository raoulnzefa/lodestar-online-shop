export const searchModule = {
  state: () => ({
    searchForm: {
      category: "all",
      text: "",
    },
    categories: [
      {
        name: "Все категории",
        value: "all",
      },
      {
        name: "Галогенные",
        value: "halogen",
      },
      {
        name: "Ксеноновые",
        value: "xenon",
      },
      {
        name: "Светодиодные",
        value: "led",
      },
      {
        name: "Накал",
        value: "incandescent",
      },
    ],
    // selected: "Все категории",
  }),
  getters: {
    SEARCH_FORM(state) {
      return state.searchForm;
    },
    CATEGORIES(state) {
      return state.categories;
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
  }
}