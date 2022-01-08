<template>
  <aside class="lode-catalog__sidebar">
    <div class="lode-catalog__sidebar-item">

    </div>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "LodeCatalogSidebar",
  computed: {
    ...mapGetters(["FILTERED_PRODUCTS"]),
  },
};
</script>

<style lang="scss">
.lode-catalog__sidebar {
  grid-area: sidebar;
  margin-top: 1rem;
  margin-right: 3rem;
  height: 100vh;

  box-shadow: 0 0 5px $black-shadow;
  border: 1px solid $grey;
}
</style>