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
    SET_SHOW_TAG_DELETE_BUTTON(state, index) {
      state.tags[index].showDeleteButton = !state.tags[index].showDeleteButton
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
    SHOW_TAG_DELETE_BUTTON({ commit, state }, index) {
      if (state.tags[index]) commit('SET_SHOW_TAG_DELETE_BUTTON', index);
    },
    HIDE_TAG_DELETE_BUTTON({ commit, state }, index) {
      if (state.tags[index]) commit('SET_SHOW_TAG_DELETE_BUTTON', index);
    }
  }
}