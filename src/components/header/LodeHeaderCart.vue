<template>
  <div class="lode-header__cart">
    <img
      :src="require('../../assets/shopping-cart.png')"
      alt=""
      class="lode-header__cart-image"
      @click.self="showCartList = !showCartList"
    >
    <transition name="fade">
      <div
        v-show="CART.length"
        class="lode-header__cart-quantity"
      >
        <p>{{CART.length ? CART.length : ''}}</p>
      </div>
    </transition>
    <ul
      class="lode-header__cart-list"
      :class="{show: showCartList}"
    >
      {{!CART.length ? "В корзине пусто" : ""}}
      <lode-header-cart-item
        v-for="(item, index) in CART"
        :key="item.article"
        :cart_item="item"
        @deleteFromCart="deleteFromCart(index)"
      />
      <div class="lode-header__cart-info">
        <p
          v-if="CART.length"
          class="lode-header__cart-info-quantity"
        >
          {{cartTotalQuantity}} item(s) selected
        </p>
        <p
          v-if="CART.length"
          class="lode-header__cart-info-total-cost"
        >
          Итого: {{cartTotalCost}} грн.
        </p>
        <div class="lode-header__cart-info-btns">
          <keep-alive>
            <router-link :to="{name: 'cart'}">
              <lode-button class="btn--view-cart">
                В корзину
              </lode-button>
            </router-link>
          </keep-alive>
          <router-link :to="{name: 'cart'}">
            <lode-button class="btn--make-deal">
              Перейти к заказу
            </lode-button>
          </router-link>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import LodeHeaderCartItem from "@/components/header/LodeHeaderCartItem";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LodeHeaderCart",
  components: {
    LodeHeaderCartItem,
  },
  props: {},
  data() {
    return {
      showCartList: false,
    };
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
    ...mapActions(["DELETE_FROM_CART"]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
  },
};
</script>

<style lang="scss">
.lode-header__cart {
  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 12.5%;
  padding: 1.5rem 0;

  &-image {
    width: 3.2rem;
    cursor: pointer;
  }

  &-quantity {
    position: absolute;
    top: 0;
    right: 0.5rem;
    z-index: 1;

    width: 1.5rem;
    height: 1.5rem;

    background-color: $white;
    border-radius: 50%;

    p {
      font-size: 1.2rem;
      line-height: 1.4;
      color: $black;
    }
  }

  &-list {
    display: none;
    position: absolute;
    top: 7.8rem;
    right: 0;
    z-index: 20;
    padding-top: 0.5rem;

    cursor: default;
    color: $black;

    max-height: 30rem;
    min-height: 3rem;
    width: 35rem;
    height: auto;

    box-shadow: 0px 3px 5px $black-shadow;
    background-color: $grey;
  }

  &-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    margin-top: 0.5rem;

    &-quantity {
      font-weight: 300;
      font-style: italic;
    }

    &-total-cost {
      font-weight: 700;
      text-transform: uppercase;
    }

    &-btns {
      display: flex;

      a {
        width: 50%;
      }
    }
  }
}
</style>