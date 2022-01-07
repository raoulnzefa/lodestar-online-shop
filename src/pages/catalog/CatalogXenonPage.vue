<template>
  <lode-header />
  <lode-catalog :selectedCategory="selectedCategory" />
</template>

<script>
import LodeHeader from "@/components/header/LodeHeader";
import LodeCatalog from "@/components/catalog/LodeCatalog";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      selectedCategory: "Ксеноновые лампы",
    };
  },
  components: {
    LodeHeader,
    LodeCatalog,
  },
  methods: {
    ...mapActions(["CHANGE_SEARCH_CATEGORY"]),
  },
  mounted() {
    this.CHANGE_SEARCH_CATEGORY(this.selectedCategory);
  },
};
</script>

<style>
</style>