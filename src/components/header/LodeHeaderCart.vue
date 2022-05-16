<template>
  <div class="lode-header__cart">
    <img
      :src="require('../../assets/shopping-cart.png')"
      alt=""
      :class="{'lode-header__cart-image--animated': cartAnimation}"
      class="lode-header__cart-image"
      @click.self.stop="toggleShowCartList()"
    >
    <transition name="fade">
      <div
        v-show="CART.length"
        class="lode-header__cart-quantity"
        :class="{'lode-header__cart-quantity--animated': cartAnimation}"
      >
        <p>{{CART.length ? CART.length : ''}}</p>
      </div>
    </transition>
    <div
      @click.stop=""
      v-show="showCartList"
      class="lode-header__cart-modal"
    >
      <ul class="lode-header__cart-list">
        {{!CART.length ? "В корзине пусто" : ""}}
        <lode-header-cart-item
          v-for="(item, index) in CART"
          :key="item.product._id"
          :cartItem="item.product"
          :quantity="item.quantity"
          :cartId="CART_ID"
          :itemIndex="index"
        />
      </ul>

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
          <lode-button
            @click="toCart"
            class="btn--view-cart"
          >
            В корзину
          </lode-button>
          <lode-button
            @click="$router.push('/')"
            class="btn--make-deal"
          >
            Перейти к заказу
          </lode-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import LodeHeaderCartItem from "@/components/header/LodeHeaderCartItem";
import { mapGetters, mapActions } from "vuex";
import { fixPrice } from "@/helpers/price";

export default {
  name: "LodeHeaderCart",
  components: {
    LodeHeaderCartItem,
  },
  data() {
    return {
      cartAnimation: false,
      showCartList: false,
    };
  },
  computed: {
    ...mapGetters(["CART", "CART_ID", "IS_USER_AUTH", "USER"]),
    cartTotalCost() {
      let result = [];

      if (this.CART.length) {
        for (let item of this.CART) {
          result.push(item.quantity * item.product.price);
        }
        return fixPrice(result.reduce((acc, curr) => (acc += curr)));
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
    cartLength() {
      return this.CART.length;
    },
    stateIsUserAuth() {
      return this.IS_USER_AUTH;
    },
  },
  methods: {
    ...mapActions(["GET_CART_FROM_API", "GET_WISHLIST_FROM_API"]),
    toggleShowCartList() {
      document
        .querySelector("body")
        .addEventListener("click", () => (this.showCartList = false), {
          once: true,
        });
      this.showCartList = !this.showCartList;
    },
    toCart() {
      this.toggleShowCartList();
      this.$router.push("/cart");
    },
  },
  watch: {
    cartLength() {
      this.cartAnimation = true;
      setTimeout(() => {
        this.cartAnimation = false;
      }, 200);
    },
    stateIsUserAuth() {
      if (this.IS_USER_AUTH) {
        this.GET_CART_FROM_API(this.USER.cart);
        this.GET_WISHLIST_FROM_API(this.USER.wishlist);
      }
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

    transition: transform 0.1s linear;

    &:hover {
      transform: scale(1.1);
    }

    &--animated {
      transform: scale(1.05);
    }
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

    transition: transform 0.1s linear;

    &--animated {
      transform: scale(1.5);
    }

    p {
      font-size: 1.2rem;
      line-height: 1.4;
      color: $black;
    }
  }

  &-modal {
    display: block;
    position: absolute;
    top: 7.8rem;
    right: -1rem;
    z-index: 20;
    padding-top: 0.5rem;

    cursor: default;
    width: 30rem;
    height: auto;

    box-shadow: $modal-shadow;
  }

  &-list {
    padding-top: 0.5rem;
    max-height: 25rem;
    min-height: 3rem;
    overflow: hidden;

    color: $black;
    overflow: auto;

    background-color: $white;
  }

  &-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;

    border-top: 1px solid $grey;
    background-color: $white;
    color: $black;

    &-quantity {
      padding-top: 0.5rem;
      font-weight: 300;
      font-style: italic;
    }

    &-total-cost {
      font-weight: 700;
      text-transform: uppercase;
    }

    &-btns {
      display: flex;
    }
  }
}
</style>