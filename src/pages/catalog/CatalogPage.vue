<template>
  <lode-catalog
    :updateSidebarFilters="updateSidebarFilters"
    :category="selectedCategory"
  />
</template>

<script>
import LodeCatalog from "@/components/catalog/LodeCatalog";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selectedCategory: "61ef07be51a966f430d29f13",
      updateSidebarFilters: false,
    };
  },
  components: {
    LodeCatalog,
  },
  methods: {
    ...mapActions([
      "GET_CATEGORIES_FROM_API",
      "CHANGE_CATEGORIES_LOADED",
      "REMOVE_ALL_TAGS",
      "SET_TAGS_QUERY",
      "SET_FILTERED_PRODUCTS",
    ]),
    updateCategories() {
      this.GET_CATEGORIES_FROM_API().then((res) => {
        this.CHANGE_CATEGORIES_LOADED(true);
      });
    },
    dropFiltration() {
      this.SET_FILTERED_PRODUCTS([]);
      this.REMOVE_ALL_TAGS();
      this.SET_TAGS_QUERY({});
    },
  },
  mounted() {
    this.dropFiltration();
    this.updateSidebarFilters = true;
  },
};
</script>

<style>
</style>