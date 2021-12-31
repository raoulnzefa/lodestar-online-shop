<template>
  <div class="lode-catalog">
    <h1 v-if="LOADING">Идет загрузка...</h1>
    <transition-group name="catalog-list">
      <lode-catalog-item
        v-for="product in filteredProducts"
        :key="product.article"
        :product="product"
        @addToCart="addToCart"
      />
    </transition-group>
  </div>
</template>

<script>
import LodeCatalogItem from "@/components/catalog/LodeCatalogItem";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "lode-catalog",
  components: { LodeCatalogItem },
  computed: {
    ...mapGetters(["PRODUCTS", "LOADING", "SEARCH_FORM", "FILTERED_PRODUCTS"]),
    filteredProducts() {
      return this.FILTERED_PRODUCTS.length
        ? this.FILTERED_PRODUCTS
        : this.PRODUCTS;
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART", "FILTER_PRODUCTS"]),
    addToCart(product) {
      this.ADD_TO_CART(product);
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
  },
};
</script>

<style lang="scss">
.lode-catalog {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto 3rem auto;

  max-width: $full-size;
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