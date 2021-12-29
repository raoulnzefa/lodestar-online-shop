export const cartModule = {
  state: () => ({
    cart: []
  }),
  getters: {
    CART(state) {
      return state.cart;
    }
  },
  mutations: {
    SET_CART: (state, product) => {
      if (state.cart.length) {
        let isProductExists = false;
        state.cart.map(item => {
          if (item.article === product.article) {
            isProductExists = true;
            item.quantity++
          }
        })
        if (!isProductExists) {
          state.cart.push(product);
        }
      } else {
        state.cart.push(product);
      }
    },
    DEL_CART: (state, index) => {
      // let index = state.cart.findIndex(product => product.article = article);
      state.cart[index].quantity = 1;
      state.cart.splice(index, 1);
    },
    INCREMENT: (state, index) => {
      state.cart[index].quantity += 1;
    },
    DECREMENT: (state, index) => {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity -= 1;
      }

    },
  },
  actions: {
    ADD_TO_CART({ commit }, product) {
      commit('SET_CART', product)
    },
    DELETE_FROM_CART({ commit }, index) {
      commit('DEL_CART', index)
    },
    INCREMENT_CART_ITEM({ commit }, index) {
      commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({ commit }, index) {
      commit('DECREMENT', index)
    }
  }
}