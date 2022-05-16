<template>
  <div class="container">
    <div class="lode-catalog">
      <lode-catalog-sidebar
        :updateSidebarFilters="updateSidebarFilters"
        :createSidebarFilters="createSidebarFilters"
        :clearFilters="clearFilters"
      />
      <div class="lode-catalog__content">
        <lode-catalog-tags
          :clearFilters="clearFilters"
          @acceptFilters="acceptPrefilteredProducts()"
        />
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
              v-show="!LOADING && IS_FOUND"
              v-for="product in pagedProducts"
              :key="product._id"
              :product="product"
            />
          </transition-group>
        </div>
        <lode-catalog-pagination
          :products="searchedAndFilteredProducts"
          :pages="pages"
          :currentPage="currentPage"
        ></lode-catalog-pagination>

      </div>

    </div> <!-- /lode-catalog -->
  </div>
</template>

<script>
import LodeCatalogItem from "@/components/catalog/LodeCatalogItem";
import LodeCatalogSidebar from "@/components/catalog/LodeCatalogSidebar";
import LodeCatalogTags from "@/components/catalog/LodeCatalogTags";
import LodeCatalogPagination from "@/components/catalog/LodeCatalogPagination";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "lode-catalog",
  components: {
    LodeCatalogItem,
    LodeCatalogSidebar,
    LodeCatalogTags,
    LodeCatalogPagination,
  },
  data() {
    return {
      createSidebarFilters: false,
      maxProductsOnPage: 9,
    };
  },
  props: {
    category: {
      type: String,
      default: "",
    },
    updateSidebarFilters: {
      type: Boolean,
      default: false,
    },
    clearFilters: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "LOADING",
      "SEARCHED_PRODUCTS",
      "FILTERED_PRODUCTS",
      "PREFILTERED_PRODUCTS",
      "IS_FOUND",
      "WAS_SEARCHED",
    ]),
    searchedAndFilteredProducts() {
      if (!this.FILTERED_PRODUCTS.length) {
        if (this.SEARCHED_PRODUCTS.length || this.WAS_SEARCHED === true) {
          return this.SEARCHED_PRODUCTS;
        } else {
          return this.IS_FOUND ? this.PRODUCTS : this.SEARCHED_PRODUCTS;
        }
      } else {
        return this.FILTERED_PRODUCTS;
      }
    },
    pages() {
      const productsQuantity = this.searchedAndFilteredProducts.length;
      return Math.ceil(productsQuantity / this.maxProductsOnPage) || 1;
    },
    currentPage() {
      return this.$route.query.page ? +this.$route.query.page : 1;
    },
    pagedProducts() {
      const start = (this.currentPage - 1) * this.maxProductsOnPage;

      return [...this.searchedAndFilteredProducts].splice(
        start,
        this.maxProductsOnPage
      );
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "SET_FILTERED_PRODUCTS"]),
    async getCategoryProducts() {
      const CATEGORY_ALL = "61ef07be51a966f430d29f13";

      if (this.category.length) {
        if (this.category === CATEGORY_ALL) {
          await this.GET_PRODUCTS_FROM_API();
        } else {
          await this.GET_PRODUCTS_FROM_API(this.category);
        }

        this.createSidebarFilters = true;
      }
    },
    acceptPrefilteredProducts() {
      this.SET_FILTERED_PRODUCTS(this.PREFILTERED_PRODUCTS);
      // this.createSidebarFilters = true;
    },
  },

  mounted() {
    if (
      this.FILTERED_PRODUCTS.length !== this.FILTERED_PRODUCTS.length ||
      !this.PRODUCTS.length ||
      !this.FILTERED_PRODUCTS.length
    ) {
      this.getCategoryProducts();
    }
  },
};
</script>

<style lang="scss">
.lode-catalog {
  display: flex;
  margin: 0 auto 3rem auto;

  max-width: $full-size;

  &__content {
    width: 70%;
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
  &-enter-active {
    transition: all 0.5s ease;
  }

  &-leave-active {
    transition: all 0s linear;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.1);
  }

  //! НАДО РЕШИТЬ ПРОБЛЕМУ ВЫЛЕТА ИЗ УГЛА СТРАНИЦЫ
  // &-move {
  //   transition: transform 0.5s ease;
  // }
}
</style>