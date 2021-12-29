<template>
  <slot></slot>
  <li class="lode-header__cart-item">
    <p class="lode-header__cart-item-name">{{shorterName(cart_item.name)}}</p>
    <p class="lode-header__cart-item-price">{{cart_item.price}} грн</p>
    <p class="lode-header__cart-item-quantity">{{cart_item.quantity}} шт.</p>
    <button
      class="lode-header__cart-item-btn"
      @click="deleteFromCart"
    >X</button>
  </li>
</template>

<script>
export default {
  name: "LodeHeaderCartItem",
  props: {
    cart_item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    deleteFromCart() {
      this.$emit("deleteFromCart");
    },
    shorterName(name) {
      return `${name.substring(0, 21)}...`;
    },
  },
  emits: ["deleteFromCart"],
};
</script>

<style lang="scss">
.lode-header__cart-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0.5rem 0.5rem;

  height: 4rem;
  border-bottom: 1px solid $secondary;

  color: $black;

  &-name {
    width: 50%;
  }

  &-price {
    width: 20%;
  }

  &-quantity {
    width: 20%;
  }

  &-button {
    width: 10%;
  }
}
</style>