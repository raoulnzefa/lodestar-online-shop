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
      },
      {
        name: "Галогенные",
        value: "Галогенные лампы",
      },
      {
        name: "Ксеноновые",
        value: "Ксеноновые лампы",
      },
      {
        name: "Светодиодные",
        value: "Светоизлучающие диоды",
      },
      {
        name: "Накал",
        value: "Лампы накаливания",
      },
    ],
    selected: "Все категории",
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