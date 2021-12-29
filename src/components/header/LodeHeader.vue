<template>
  <header class="lode-header">
    <div class="container">
      <div class="lode-header__inner">
        <div class="lode-header__logo-wrepper">
          <router-link :to="{name: 'main'}">
            <img
              :src="require('../../assets/Lodestar Logo.jpg')"
              class="lode-header__logo"
            >
          </router-link>
        </div>
        <lode-header-search class="lode-header__search"></lode-header-search>
        <div class="lode-header__wishlist">Wishlist</div>
        <lode-header-cart />
      </div>
    </div>
  </header>
  <lode-header-navigation />
</template>

<script>
import LodeHeaderCart from "@/components/header/LodeHeaderCart";
import LodeHeaderNavigation from "@/components/header/LodeHeaderNavigation";
import LodeHeaderSearch from "@/components/header/LodeHeaderSearch";

export default {
  name: "LodeHeader",
  components: {
    LodeHeaderCart,
    LodeHeaderNavigation,
    LodeHeaderSearch,
  },
};
</script>

<style lang="scss">
.lode-header {
  display: block;
  padding: 1.5rem 0;
  background-color: $secondary;
  color: $white;

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
  }

  &__logo {
    width: 100%;

    &-wrepper {
      display: flex;
      justify-content: flex-start;
      width: 25%;

      a {
        width: 80%;
      }
    }
  }

  &__search {
    width: 50%;
    padding: 1.5rem 0;
  }

  &__wishlist {
    display: flex;
    justify-content: flex-end;
    width: 12.5%;
    padding: 1.5rem 0;
  }
}
</style>