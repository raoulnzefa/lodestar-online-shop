<template>
  <nav class="lode-header-navigation">
    <div class="container">
      <div class="lode-header-navigation__inner">
        <div class="lode-header-navigation__item">
          <router-link
            :to="'/'"
            class="lode-header-navigation__link"
            :class="{'lode-header-navigation__link--active': checkActive('/')}"
          >Главная</router-link>
        </div>
        <div class="lode-header-navigation__item">
          <router-link
            :to="'/catalog'"
            class="lode-header-navigation__link"
            :class="{'lode-header-navigation__link--active': checkActive('/catalog')}"
          >Все товары</router-link>
        </div>
        <div
          v-for="category in categories"
          :key="category._id"
          class="lode-header-navigation__item"
        >
          <router-link
            :to="{path: category.path}"
            class="lode-header-navigation__link"
            :class="{'lode-header-navigation__link--active': checkActive(category.path)}"
          >{{category.value}}</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LodeHeaderNavigation",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["CATEGORIES"]),
    categories() {
      return this.CATEGORIES.filter(
        (category) => category.value !== "Все категории"
      );
    },
  },
  methods: {
    checkActive(path) {
      const route = this.$route.path;
      return route === path ? true : false;
    },
  },
};
</script>

<style lang="scss">
.lode-header-navigation {
  display: flex;
  justify-content: flex-start;
  padding: 1.5rem 3rem;
  margin-bottom: 3rem;

  background-color: $white;
  border-top: 4px solid $accent;
  border-bottom: 1px solid $grey;
  box-shadow: 0px 3px 5px $grey-shadow;

  .container {
    width: 100%;
  }

  &__inner {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }

  &__item {
    margin: 0 1.5rem;
  }

  &__link {
    position: relative;
    z-index: 1;

    text-decoration: none;
    color: $black;
    font-weight: 500;

    transition: color 0.1s linear;
    cursor: pointer;

    &:hover,
    &:focus {
      color: $accent;
      outline: none;

      &::after {
        width: 100%;
      }
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;

      width: 0;
      height: 2px;
      background-color: $accent;

      transition: width 0.2s ease-in-out;
    }

    &--active {
      &::after {
        width: 100%;
      }
    }
  }
}
</style>