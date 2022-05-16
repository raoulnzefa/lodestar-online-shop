<template>
  <lode-catalog :category="selectedCategory" />
</template>

<script>
import LodeCatalog from "@/components/catalog/LodeCatalog";
export default {
  data() {
    return {
      selectedCategory: "61f9a9a091387408bc2f3779",
    };
  },
  components: {
    LodeCatalog,
  },
};
</script>

<style>
</style>