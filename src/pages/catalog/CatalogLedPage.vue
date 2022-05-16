<template>
  <lode-catalog :category="selectedCategory" />
</template>

<script>
import LodeCatalog from "@/components/catalog/LodeCatalog";
export default {
  data() {
    return {
      selectedCategory: "61ef07be51a966f430d29f16",
    };
  },
  components: {
    LodeCatalog,
  },
};
</script>

<style>
</style>