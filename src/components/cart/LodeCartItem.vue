<template>
  <li class="lode-cart__item">
    <img
      class="lode-cart__item-image"
      :src="cart_item.image"
      alt=""
    >
    <h1 class="lode-cart__item-name">{{cart_item.name}}</h1>
    <p class="lode-cart__item-article">{{cart_item.article}}</p>
    <p class="lode-cart__item-quantity">
      <span @click="incrementItem">+</span>
      {{cart_item.quantity}}
      <span @click="decrementItem">-</span>
    </p>
    <p class="lode-cart__item-price">{{cart_item.price}}</p>
    <lode-button
      @click="deleteFromCart"
      class="btn--delete-from-cart"
    >Х</lode-button>
  </li>
</template>

<script>
export default {
  name: "LodeCartItem",
  data() {
    return {};
  },
  props: {
    cart_item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    deleteFromCart() {
      this.$emit("deleteFromCart");
    },
    decrementItem() {
      this.$emit("decrementItem");
    },
    incrementItem() {
      this.$emit("incrementItem");
    },
  },
  emits: ["deleteFromCart", "incrementItem", "decrementItem"],
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

  &-image {
    height: 100px;
    width: 100px;
    max-width: 20%;
  }

  &-name {
    font-weight: 500;
    font-size: 1.8rem;

    width: 40%;
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