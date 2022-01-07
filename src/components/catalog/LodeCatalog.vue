<template>
  <div class="container">
    <div class="lode-catalog">
      <lode-catalog-tags />
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
import LodeCatalogTags from "@/components/catalog/LodeCatalogTags";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "lode-catalog",
  components: { LodeCatalogItem, LodeCatalogSidebar, LodeCatalogTags },
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
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART", "FILTER_PRODUCTS"]),
    addToCart(product) {
      this.ADD_TO_CART(product);
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
</style>