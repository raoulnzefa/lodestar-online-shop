<template>
  <div class="lode-cards__item">
    <h1 class="lode-cards__item-title">{{itemsObject.value}}</h1>
    <router-link
      class="lode-cards__item-link"
      :to="itemsObject.path"
    >Перейти к категории</router-link>
    <div class="lode-cards__item-inner">
      <img
        :src="require(`../../${itemsObject.image}`)"
        alt=""
        class="lode-cards__item-image"
      >
    </div>

  </div>
</template>

<script>
export default {
  name: "LodeCardsCategoriesItem",
  props: {
    itemsObject: {
      type: Object,
      default() {
        return {};
      },
      require: false,
    },
  },
};
</script>

<style lang="scss">
.lode-cards__item {
  position: relative;
  width: 33.3%;
  padding: 1.5rem 1.5rem;

  &:hover {
    .lode-cards__item-image {
      transform: scale(1.1);
    }
  }

  &-title,
  &-link {
    position: absolute;
    left: calc(2.5rem + 1.5rem);
    z-index: 3;
  }

  &-title {
    top: calc(2.5rem + 1.5rem); // 1.5rem - padding
    max-width: 50%;

    text-align: left;
    line-height: 1.1;
    font-weight: 700;
    font-size: 2.4rem;
    color: $white;
  }

  &-link {
    top: calc(10rem + 1.5rem); // 1.5rem - padding

    font-size: 1.6rem;
    text-decoration: none;
    color: $white;

    transition: transform 0.2s linear;

    &:hover {
      transform: scale(1.05);
    }
  }

  &-inner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    max-height: 24rem;

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: -20rem;
      left: -17rem;
      z-index: 2;

      width: 40rem;
      height: 40rem;
      background-color: $accent-half;

      transform: rotate(45deg);
    }
  }

  &-image {
    width: 100%;
    transition: transform 0.5s ease;

    // to remove page jumping
    height: 37rem;
    width: 37rem;
  }
}
</style>