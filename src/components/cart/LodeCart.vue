<template>
  <div class="container">
    <div class="lode-cart">
      <h1 class="lode-cart__title">Корзина</h1>
      <p v-if="!CART.length">В корзине нету товаров</p>
      <div
        v-if="CART.length"
        class="lode-cart__names"
      >
        <p class="lode-cart__names-photo">Фото</p>
        <p class="lode-cart__names-name">Название</p>
        <p class="lode-cart__names-article">Артикул</p>
        <p class="lode-cart__names-quantity">Количество</p>
        <p class="lode-cart__names-price">Цена</p>
        <p class="lode-cart__names-delete"></p>
      </div>
      <ul class="lode-cart__list">
        <lode-cart-item
          v-for="(item, index) in CART"
          :key="item.article"
          :cart_item="item"
          @deleteFromCart="deleteFromCart(index)"
          @decrementItem="decrementItem(index)"
          @incrementItem="incrementItem(index)"
        />
      </ul>
      <div
        v-if="CART.length"
        class="lode-cart__resume"
      >
        <div class="lode-cart__resume-buttons">
          <router-link :to="{name: 'catalog'}">
            <lode-button>Продолжить покупки</lode-button>
          </router-link>
          <lode-button>Оформить заказ</lode-button>
        </div>
        <div class="lode-cart__resume-total">
          <p class="lode-cart__resume-total-title">Общее количество товаров:</p>
          <h2 class="lode-cart__resume-total-quantity">{{cartTotalQuantity}}</h2>
          <p class="lode-cart__resume-total-title">Итого:</p>
          <h2 class="lode-cart__resume-total-price">{{cartTotalCost}} грн.</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LodeCartItem from "@/components/cart/LodeCartItem";
export default {
  name: "LodeCart",
  components: {
    LodeCartItem,
  },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["CART"]),
    cartTotalCost() {
      let result = [];

      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.quantity * item.price);
        }

        return result.reduce((acc, curr) => (acc += curr));
      }

      return 0;
    },
    cartTotalQuantity() {
      let result = [];

      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.quantity);
        }

        return result.reduce((acc, curr) => (acc += curr));
      }
      return 0;
    },
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM",
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    incrementItem(index) {
      this.INCREMENT_CART_ITEM(index);
    },
    decrementItem(index) {
      this.DECREMENT_CART_ITEM(index);
    },
  },
};
</script>

<style lang="scss">
.lode-cart {
  &__title {
    margin: 1.5rem 0;
    font-weight: 700;
    font-size: 2.6rem;
  }

  &__list {
    width: 100%;
  }

  &__resume {
    display: flex;
    margin-top: 2.5rem;
    justify-content: space-between;
    align-items: center;

    &-total {
      display: flex;
      justify-content: center;
      align-items: center;

      &-title {
        margin-right: 0.5rem;
        font-size: 1.8rem;
      }

      &-price {
        font-weight: 700;
        font-size: 2.4rem;
      }

      &-quantity {
        font-weight: 700;
        font-size: 1.8rem;
        margin-right: 2rem;
      }
    }
  }

  &__names {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;

    p {
      border-right: 1px solid $grey;
    }

    &-photo {
      width: 100px;
      max-width: 20%;
    }

    &-name {
      width: 40%;
    }

    &-article {
      width: 15%;
    }

    &-quantity {
      width: 10%;
    }

    &-price {
      width: 10%;
    }

    &-delete {
      width: 5%;
    }
  }
}
</style>