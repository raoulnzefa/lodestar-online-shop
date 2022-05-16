<template>
  <lode-upper-header />
  <header class="lode-header">
    <div class="container">
      <div class="lode-header__inner">
        <div class="lode-header__logo-wrepper">
          <img
            :src="require('../../assets/Lodestar Logo.jpg')"
            class="lode-header__logo"
            @click="$router.push('/')"
          >
        </div>
        <lode-header-search class="lode-header__search"></lode-header-search>
        <div class="lode-header__wishlist">
          <router-link :to="'/wishlist'">
            <img
              :src="HeartWhiteSvgSrc"
              alt=""
              class="lode-header__wishlist-image"
            >
          </router-link>

        </div>
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
import LodeUpperHeader from "@/components/header/LodeUpperHeader";
import { HeartWhiteSvgSrc } from "@/assets/icons";

export default {
  name: "LodeHeader",
  components: {
    LodeHeaderCart,
    LodeHeaderNavigation,
    LodeHeaderSearch,
    LodeUpperHeader,
  },
  data() {
    return {
      HeartWhiteSvgSrc,
    };
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
    width: 80%;
    cursor: pointer;

    &-wrepper {
      display: flex;
      justify-content: flex-start;
      width: 25%;
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

    &-image {
      max-width: 3.5rem;
      cursor: pointer;

      transition: transform 0.1s linear;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>