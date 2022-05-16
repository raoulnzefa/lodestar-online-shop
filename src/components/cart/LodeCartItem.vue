<template>
  <li class="lode-cart__item">
    <div class="lode-cart__item-picture">
      <img
        class="lode-cart__item-image"
        :src="cartItemImage"
        alt=""
      >
    </div>
    <h1
      @click="$router.push(`/catalog/${cartItem.article}`)"
      class="lode-cart__item-name"
    >{{cartItem.name}}</h1>
    <p class="lode-cart__item-article">{{cartItem.article}}</p>
    <p class="lode-cart__item-quantity">
      <span @click="incrementCartItem()">+</span>
      {{quantity}}
      <span @click="decrementCartItem()">-</span>
    </p>
    <p class="lode-cart__item-price">{{fixedPrice}}</p>
    <lode-button
      @click="deleteFromCart()"
      class="btn--delete-from-cart btn--hover-lighten"
    >Х</lode-button>
  </li>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { fixPrice } from "@/helpers/price";

export default {
  name: "LodeCartItem",
  props: {
    cartItem: {
      type: Object,
      default() {
        return {};
      },
      require: true,
    },
    cartId: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      default: 1,
      require: true,
    },
    itemIndex: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapGetters(["IS_USER_AUTH", "CART"]),
    fixedPrice() {
      return fixPrice(this.cartItem.price);
    },
    cartItemImage() {
      return this.cartItem.image.includes("http")
        ? this.cartItem.image
        : require(`../../${this.cartItem.image}`);
    },
    localStorageCart() {
      return JSON.parse(localStorage.getItem("cart"));
    },
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM",
      "SET_CART",
    ]),
    ...mapMutations(["INCREMENT_LOCAL_CART_ITEM", "DECREMENT_LOCAL_CART_ITEM"]),
    incrementCartItem() {
      if (this.IS_USER_AUTH) {
        this.INCREMENT_CART_ITEM({
          cartId: this.cartId,
          productId: this.cartItem._id,
        });
      } else {
        this.INCREMENT_LOCAL_CART_ITEM(this.itemIndex);
        localStorage.setItem("cart", JSON.stringify(this.CART));
      }
    },
    decrementCartItem() {
      if (this.IS_USER_AUTH) {
        this.DECREMENT_CART_ITEM({
          cartId: this.cartId,
          productId: this.cartItem._id,
          quantity: this.quantity,
        });
      } else {
        this.DECREMENT_LOCAL_CART_ITEM(this.itemIndex);
        localStorage.setItem("cart", JSON.stringify(this.CART));
      }
    },
    deleteItemFromLocalStorageCart() {
      let newCart = [...this.localStorageCart];
      newCart.splice(this.itemIndex, 1);

      localStorage.setItem("cart", JSON.stringify(newCart));

      return newCart;
    },
    deleteFromCart() {
      if (this.IS_USER_AUTH) {
        return this.DELETE_FROM_CART({
          cartId: this.cartId,
          productId: this.cartItem._id,
        });
      } else {
        const newCart = this.deleteItemFromLocalStorageCart();
        this.SET_CART(newCart);
      }
    },
  },
};
</script>

<style lang="scss">
.lode-cart__item {
  margin: 1.5rem 0;
  padding: 0.5rem;

  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  border: 1px solid $grey;

  transition: box-shadow 0.1s linear;

  &:hover {
    box-shadow: 0px 0px 10px $grey-shadow;
  }

  &-picture {
    max-width: 20%;
    min-width: 100px;
  }

  &-image {
    max-height: 100px;
    max-width: 100px;
  }

  &-name {
    width: 40%;

    font-weight: 500;
    font-size: 1.8rem;

    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &-article {
    font-size: 1.4rem;

    width: 15%;
  }

  &-quantity {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 10%;
    font-size: 1.8rem;

    span {
      margin: 0 0.5rem;
      cursor: pointer;
      font-size: 1.6rem;

      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }

  &-price {
    width: 10%;
  }
}
</style>