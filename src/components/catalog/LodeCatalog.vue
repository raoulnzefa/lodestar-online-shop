<template>
  <div class="lode-catalog">
    <lode-catalog-item
      v-for="product in PRODUCTS"
      :key="product.article"
      :product="product"
      @addToCart="addToCart"
    />
  </div>
</template>

<script>
import LodeCatalogItem from "@/components/catalog/LodeCatalogItem";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "lode-catalog",
  components: { LodeCatalogItem },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),

    addToCart(product) {
      this.ADD_TO_CART(product);
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API().then((response) => {
      if (response.data) {
        console.log("Products has been loaded");
      } else {
        console.log("Some problem with getting products");
      }
    });
  },
  computed: {
    ...mapGetters(["PRODUCTS"]),
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
</style>