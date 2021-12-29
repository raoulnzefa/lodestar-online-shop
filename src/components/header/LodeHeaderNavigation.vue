<template>
  <div class="lode-header-navigation">
    <div class="container">
      <div class="lode-header-navigation__inner">
        <div class="lode-header-navigation__item">
          <router-link :to="{name: 'catalog'}">
            <p class="lode-header-navigation__link">Catalog</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LodeHeaderNavigation",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.lode-header-navigation {
  display: flex;
  justify-content: flex-start;
  padding: 1rem 3rem;

  background-color: $white;
  border-top: 3px solid $accent;
  border-bottom: 1px solid $grey;

  .container {
    width: 100%;
  }

  &__inner {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }

  &__item {
    margin: 0 1.5rem;
  }

  &__link {
    text-decoration: none;
    color: $black;
    font-weight: 500;

    &:hover {
      color: $accent;
    }
  }
}
</style>