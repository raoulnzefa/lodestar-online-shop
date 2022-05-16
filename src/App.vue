<template>
  <lode-header />
  <div class="main-wrapper">
    <router-view>
    </router-view>
  </div>
  <lode-footer />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LodeHeader from "@/components/header/LodeHeader";
import LodeFooter from "@/components/footer/LodeFooter";

export default {
  data() {
    return {};
  },
  components: {
    LodeHeader,
    LodeFooter,
  },
  computed: {
    ...mapGetters(["IS_USER_AUTH"]),
    localStorageCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },
    localStorageWishlist() {
      return JSON.parse(localStorage.getItem("wishlist"));
    },
  },
  methods: {
    ...mapActions(["CHECK_AUTH", "SET_CART", "SET_WISHLIST"]),
    addCartToLocalStorage() {
      const cart = JSON.stringify([]);
      localStorage.setItem("cart", cart);
    },
    addWishlistToLocalStorage() {
      const wishlist = JSON.stringify([]);
      localStorage.setItem("wishlist", wishlist);
    },
    setLocalStorageCart() {
      if (!this.localStorageCart) {
        this.addCartToLocalStorage();
        this.SET_CART(this.localStorageCart);
      } else {
        this.SET_CART(this.localStorageCart);
      }
    },
    setLocalStorageWishlist() {
      if (!this.localStorageWishlist) {
        this.addWishlistToLocalStorage();
        this.SET_WISHLIST(this.localStorageWishlist);
      } else {
        this.SET_WISHLIST(this.localStorageWishlist);
      }
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.CHECK_AUTH();
      return;
    }

    if (!this.IS_USER_AUTH) {
      this.setLocalStorageCart();
      this.setLocalStorageWishlist();
    }
  },
};
</script>



<style lang="scss">
#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-wrapper {
  margin: 0 auto;
  min-height: 70vh;
}

// Animation for pages (not necessary for now)
// .pages {
//   &-enter-active {
//     transition: all 0.6s ease-in-out;
//   }

//   &-leave-active {
//     transition: all 0.3s ease-in-out;
//   }

//   &-enter-from {
//     opacity: 0;
//     transform: translateX(-100vw);
//   }

//   &-leave-to {
//     opacity: 0;
//     transform: translateX(100vw);
//   }
// }
</style>
