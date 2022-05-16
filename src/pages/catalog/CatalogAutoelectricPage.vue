<template>
  <lode-catalog :category="selectedCategory" />
</template>

<script>
import LodeCatalog from "@/components/catalog/LodeCatalog";
export default {
  data() {
    return {
      selectedCategory: "61f9a91f91387408bc2f3778",
    };
  },
  components: {
    LodeCatalog,
  },
};
</script>

<style>
</style>