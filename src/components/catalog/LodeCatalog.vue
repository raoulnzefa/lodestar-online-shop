<template>
  <div class="container">
    <div class="lode-catalog">
      <div
        :class="{'lode-catalog__tags--active': TAGS.length}"
        class="lode-catalog__tags"
      >
        <transition-group name="tag-items">
          <div
            v-for="(tag, index) in TAGS"
            :key="tag.id"
            @mouseenter="SHOW_TAG_DELETE_BUTTON(index)"
            @mouseleave="HIDE_TAG_DELETE_BUTTON(index)"
            class="lode-catalog__tags-item"
          >
            <p class="lode-catalog__tags-name">{{tag.name}}</p>
            <transition name="tag-delete-btn">
              <lode-button
                v-show="tag.showDeleteButton"
                @click="removeTagAndFilterProducts(index)"
                class="btn--delete-tag"
              >X</lode-button>
            </transition>
          </div>
        </transition-group>
        <p
          @click="removeAllTagsAndFilterProducts"
          class="lode-catalog__tags-clear"
        >Очистить фильтр</p>
      </div>
      <lode-catalog-sidebar />
      <h1
        class="lode-catalog__loading"
        v-if="LOADING"
      >Идет загрузка...</h1>
      <h1
        class="lode-catalog__found"
        v-if="!IS_FOUND"
      >Товар не найден</h1>
      <div
        v-show="!LOADING && IS_FOUND"
        class="lode-catalog__list"
      >
        <transition-group name="catalog-list">
          <lode-catalog-item
            v-for="product in filteredProducts"
            :key="product.article"
            :product="product"
            @addToCart="addToCart"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import LodeCatalogItem from "@/components/catalog/LodeCatalogItem";
import LodeCatalogSidebar from "@/components/catalog/LodeCatalogSidebar";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "lode-catalog",
  components: { LodeCatalogItem, LodeCatalogSidebar },
  props: {
    selectedCategory: {
      type: String,
      default() {
        return "";
      },
    },
  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "LOADING",
      "SEARCH_FORM",
      "FILTERED_PRODUCTS",
      "IS_FOUND",
      "TAGS",
    ]),
    filteredProducts() {
      if (this.FILTERED_PRODUCTS.length) {
        return this.FILTERED_PRODUCTS;
      } else {
        return this.IS_FOUND ? this.PRODUCTS : this.FILTERED_PRODUCTS;
      }
    },
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "ADD_TO_CART",
      "FILTER_PRODUCTS",
      "REMOVE_TAG",
      "REMOVE_ALL_TAGS",
      "SHOW_TAG_DELETE_BUTTON",
      "HIDE_TAG_DELETE_BUTTON",
    ]),
    addToCart(product) {
      this.ADD_TO_CART(product);
    },
    removeTagAndFilterProducts(index) {
      this.REMOVE_TAG(index);
      this.FILTER_PRODUCTS();
    },
    removeAllTagsAndFilterProducts() {
      this.REMOVE_ALL_TAGS();
      this.FILTER_PRODUCTS();
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API().then((resolve) => {
      if (this.selectedCategory) {
        this.FILTER_PRODUCTS();
      }
    });
  },
};
</script>

<style lang="scss">
.lode-catalog {
  display: grid;
  grid-template-areas: "sidebar tags" "sidebar message" "sidebar catalog";
  grid-template-columns: 30% 70%;
  grid-template-rows: 3rem 4rem auto;
  margin: 0 auto 3rem auto;

  max-width: $full-size;

  &__tags {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    grid-area: tags;
    height: 3rem;
    margin: 1rem 0;
    padding: 0 1rem;

    border: 1px solid $grey-light;
    border-radius: 1.5rem;

    transition: box-shadow 0.1s linear, border-color 0.1s linear;

    &--active {
      border-color: $grey;
      box-shadow: 0 0 10px $grey-shadow;
    }

    &-item {
      display: inline-flex;
      padding: 0 0.5rem;
      margin-right: 1rem;
      width: auto;

      border: 1px solid $accent;
      border-radius: 1.5rem;

      line-height: 1.6;

      transition: box-shadow 0.1s linear, width 0.5s linear;

      &:hover {
        box-shadow: 0 0 5px $accent-shadow;
      }
    }

    &-name {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    &-clear {
      position: absolute;
      right: 1rem;
      bottom: 50%;
      z-index: 1;

      transform: translateY(50%);
      color: $grey-light;
      transition: all 0.1s linear;

      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      .lode-catalog__tags--active > & {
        cursor: pointer;
        color: $grey;

        &:hover {
          color: $black;
          text-decoration: underline;
        }
      }
    }
  }

  &__loading,
  &__found {
    grid-area: message;
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;

    font-size: 1.8rem;
    font-weight: 500;
  }

  &__list {
    grid-area: catalog;
    display: flex;
    justify-content: center;
    align-self: start;
    flex-wrap: wrap;
  }
}

.catalog-list {
  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.1);
  }

  &-move {
    transition: transform 0.5s ease;
  }
}

.tag {
  &-delete-btn,
  &-items {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s ease;
    }

    &-move {
      transition: transform 0.3s ease;
    }
  }

  &-delete-btn {
    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateX(-1rem);
    }
  }

  &-items {
    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateY(-3rem);
    }
  }
}
</style>