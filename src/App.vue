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
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (!this.localStorageCart) {
        this.addCartToLocalStorage();
        this.SET_CART(cart);
      } else {
        this.SET_CART(cart);
      }
    },
    setLocalStorageWishlist() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist"));
      if (!this.localStorageWishlist) {
        this.addWishlistToLocalStorage();
        this.SET_WISHLIST(wishlist);
      } else {
        this.SET_WISHLIST(wishlist);
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
</style>
