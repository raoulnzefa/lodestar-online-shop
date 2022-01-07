<template>
  <div class="lode-catalog-item">
    <p class="lode-catalog-item__article">Артикул: {{product.article}}</p>
    <div class="lode-catalog-item__flags">
      <div
        @click="addTagAndFilterProducts(product.series)"
        v-if="product.series"
        class="lode-catalog-item__series"
      >{{product.series}}</div>
      <div
        v-else
        class="lode-catalog-item__series  lode-catalog-item__series--nothing"
      >1</div>
      <div
        @click="addTagAndFilterProducts(product.subseries)"
        class="lode-catalog-item__series lode-catalog-item__series--subseries"
        v-if="product.subseries"
      >{{product.subseries}}</div>
    </div>
    <img
      :src="product.image"
      alt="item image"
      @click="$router.push(`/catalog/${product.article}`)"
      class="lode-catalog-item__image"
    >
    <h3
      @click="$router.push(`${getCategoryPath}`)"
      class="lode-catalog-item__category"
    >{{product.category}}</h3>
    <h1
      @click="$router.push(`/catalog/${product.article}`)"
      class="lode-catalog-item__name"
    >{{product.name}}</h1>
    <h2 class="lode-catalog-item__price">Цена: {{fixedPrice}} грн</h2>
    <div class="lode-catalog-item__add-to-cart">
      <lode-button
        class="btn--add-to-cart"
        @click="addToCart"
      >
        В корзину
      </lode-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
      require: true,
    },
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product);
    },
    ...mapActions(["ADD_TAG", "FILTER_PRODUCTS"]),
    addTagAndFilterProducts(tag) {
      this.ADD_TAG(tag);
      this.FILTER_PRODUCTS();
    },
  },
  computed: {
    ...mapGetters(["LOADING", "CATEGORIES", "TAGS"]),
    getCategoryPath() {
      for (let category of this.CATEGORIES) {
        if (
          this.product.category.toLowerCase() === category.value.toLowerCase()
        )
          return category.path;
      }
    },
    fixedPrice() {
      return this.product.price?.toFixed(2).split(".").join(",");
    },
  },
};
</script>

<style lang="scss">
.lode-catalog-item {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px 10px;
  margin: 1rem 1rem;

  width: 22.5rem;
  max-width: 22.5rem;
  max-height: 42.1rem;

  border: 1px solid $grey;
  background-color: $white;

  transition: border 0.1s linear, border-color 0.1s linear,
    box-shadow 0.1s linear, height 0.2s linear;

  &:hover {
    border: 1px solid $accent-light;
    box-shadow: 0 3px 10px $accent-shadow;

    .lode-catalog-item__add-to-cart {
      transform: translateY(100%);
      opacity: 1;
    }

    .btn--add-to-cart {
      opacity: 1;
    }
  }

  &__article {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    z-index: 0;

    font-size: 1rem;
    font-weight: 300;
    text-transform: uppercase;
    color: $grey;
  }

  &__flags {
    display: flex;
    justify-content: center;
  }

  &__series {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    margin-bottom: 1rem;
    margin-right: 0.5rem;

    font-weight: 700;
    color: $black-light;
    cursor: pointer;

    border: 2px solid $grey;

    &--subseries {
      border-color: $series-gold;
    }

    &--nothing {
      opacity: 0;
    }
  }

  &__image {
    margin: 0 auto 1rem auto;
    height: 22.5rem;
    width: 20rem;

    cursor: pointer;
  }

  &__category {
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-size: 1.2rem;
    color: #8d99ae;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__name {
    margin-bottom: 2rem;
    text-transform: uppercase;
    font-size: 1.6rem;
    font-weight: 700;
    color: $black;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__price {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    width: 90%;

    color: $accent;
    font-size: 1.6rem;
    font-weight: 700;

    transform: translateX(-50%);
  }

  &__add-to-cart {
    padding-bottom: 1rem;
    position: absolute;
    bottom: 0;
    left: -1px;
    z-index: 1;
    width: calc(100% + 2px);
    opacity: 0;

    border-bottom: 1px solid $accent-light;
    border-right: 1px solid $accent-light;
    border-left: 1px solid $accent-light;
    background-color: #fff;
    box-shadow: 0 5px 10px -4px $accent-shadow;

    transition: transform 0.2s linear, opacity 0.1s linear;
  }
}
</style>