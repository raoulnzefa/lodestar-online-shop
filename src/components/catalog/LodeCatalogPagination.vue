<template>
  <div class="lode-catalog-pagination">
    <div
      v-for="number in pages"
      :key="number"
      class="lode-catalog-pagination__item"
      :class="{'lode-catalog-pagination__item--active': number === currentPage}"
      @click="changePage(number)"
    >
      <p class="lode-catalog-pagination__number">{{number}}</p>

    </div>
  </div>
</template>

<script>
import { deleteLastRouterQuery } from "@/helpers/router";

export default {
  props: {
    products: {
      type: Object,
      default() {
        return {};
      },
      required: true,
    },
    pages: {
      type: Number,
      default: 1,
      required: true,
    },
    currentPage: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  methods: {
    changePage(pageNumber) {
      const path = this.$route.path;
      const routerQuery = this.$route.query;

      if (pageNumber !== 1) {
        return this.$router.push({
          path,
          query: { ...routerQuery, page: pageNumber },
        });
      } else {
        let query = deleteLastRouterQuery(routerQuery);
        return this.$router.push({ path, query });
      }
    },
  },
};
</script>

<style lang="scss">
.lode-catalog-pagination {
  display: flex;
  justify-content: center;
  margin-top: 10rem;

  &__item {
    display: flex;
    width: 3rem;
    height: 3rem;
    border-radius: 3px;
    border: 1px solid $accent;
    margin-right: 1rem;

    justify-content: center;
    align-items: center;
    cursor: pointer;

    &--active {
      background-color: $accent;
      box-shadow: 0 0 8px $accent-shadow;
      font-weight: 700;
      color: $white;
    }
  }
}
</style>