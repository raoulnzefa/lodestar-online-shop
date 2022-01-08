<template>
  <lode-header />
  <h1 v-if="isProductLoading">Товар грузиться...</h1>
  <div class="container">
    <div
      v-show="!isProductLoading"
      class="lode-product"
    >
      <div class="lode-product__visual">
        <img
          :src="thisProduct.imageLarge"
          alt=""
          class="lode-product__image"
        >
      </div>
      <div class="lode-product__info">
        <h1 class="lode-product__name">{{thisProduct.name}}</h1>
        <h2 class="lode-product__price">
          <span class="lode-product__label">Цена:</span>
          {{fixedPrice}} грн
        </h2>
        <div class="lode-product__available">
          <span class="lode-product__label">Есть в наличии:</span>
          <p class="lode-product__available-sign">Да</p>
        </div>
        <div class="lode-product__brand">
          <span class="lode-product__label">Брeнд:</span>
          <p class="lode-product__attentions">{{thisProduct.brand}}</p>
        </div>
        <div class="lode-product__description">
          <span class="lode-product__label">Описание:</span>
          <p class="lode-product__text">{{thisProduct.description}}</p>
        </div>
        <div class="lode-product__specs">
          <span class="lode-product__label">Specifications:</span>
          <ul class="lode-product__specs-list">
            <li
              v-for="spec in thisProduct.specifications"
              :key="spec.id"
              class="lode-product__specs-item"
            >
              <span class="lode-product__specs-label">{{spec.name}}</span>:
              {{spec.value}}
            </li>
          </ul>
        </div>
        <div class="lode-product__navigation">
          <!-- <div class="lode-product__navigation-package"></div>
          <div class="lode-product__navigation-quantity"></div> -->
          <lode-button
            @click="buyProduct(thisProduct)"
            class="btn--product-buy"
          >Купить</lode-button>
          <lode-button
            @click="ADD_TO_CART(thisProduct)"
            class="btn--product-add-to-cart"
          >Добавить в корзину</lode-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import LodeHeader from "@/components/header/LodeHeader.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { LodeHeader },
  props: {
    article: {
      type: String,
      default() {
        return "Все категории";
      },
      require: true,
    },
  },
  data() {
    return {
      isProductLoading: true,
    };
  },
  computed: {
    ...mapGetters(["PRODUCTS"]),
    thisProduct() {
      let result = this.PRODUCTS.find(
        (product) => product.article == this.$route.params.article
      );
      if (typeof result !== "undefined") {
        this.isProductLoading = false;
        return result;
      } else {
        return {};
      }
    },
    fixedPrice() {
      return this.thisProduct.price?.toFixed(2).split(".").join(",");
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCTS_FROM_API", "ADD_TO_CART"]),
    buyProduct(product) {
      this.ADD_TO_CART(product);
      this.$router.push("/cart");
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API();
  },
};
</script>

<style lang="scss">
.lode-product {
  display: flex;
  justify-content: center;

  &__visual {
    width: 40%;
    padding: 1.5rem;
    margin-right: 3%;

    border: 1px solid $grey;
    box-shadow: 0 0 5px $black-shadow;
  }

  &__image {
    height: 35rem;
    width: 35rem;
  }

  &__info {
    padding: 1.5rem;
    width: 57%;

    border: 1px solid $grey;
    box-shadow: 0 0 5px $black-shadow;

    * {
      text-align: left;
    }
  }

  &__name {
    margin-bottom: 1.5rem;
    font-size: 2.4rem;
    font-weight: 600;
    color: $black;
  }

  &__price {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    font-weight: 500;
  }

  &__label {
    font-weight: 700;
    margin-right: 0.5rem;
  }

  &__available,
  &__brand {
    display: flex;
  }

  &__available,
  &__brand,
  &__description,
  &__specs {
    margin-bottom: 1rem;
  }

  &__description {
    text-align: left;
  }

  &__specs {
    &-label {
      text-decoration: underline;
    }
  }

  &__navigation {
    display: flex;
  }
}
</style>