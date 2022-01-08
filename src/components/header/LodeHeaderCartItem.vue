<template>
  <slot></slot>
  <li class="lode-header__cart-item">
    <img
      class="lode-header__cart-item-image"
      :src="cart_item.image"
      alt=""
    >
    <div class="lode-header__cart-item-info">
      <p
        @click="$router.push(`/catalog/${cart_item.article}`)"
        class="lode-header__cart-item-name"
      >{{shorterName(cart_item.name)}}</p>
      <p class="lode-header__cart-item-price">{{fixedPrice}} грн</p>
      <p class="lode-header__cart-item-quantity">{{cart_item.quantity}} шт.</p>
    </div>
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
      return name.length > 21 ? `${name.substring(0, 21)}...` : name;
    },
  },
  computed: {
    fixedPrice() {
      return this.cart_item.price.toFixed(2).split(".").join(",");
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
  padding: 0.5rem 1rem;

  height: auto;
  border-bottom: 1px solid $grey;
  color: $black;

  transition: box-shadow 0.1s ease;

  &:hover {
    box-shadow: 0 0 5px $black-shadow;
  }

  &:last-child {
    border-bottom: none;
  }

  &-image {
    margin-right: 2rem;
    width: 20%;
  }

  &-info {
    display: flex;
    flex-wrap: wrap;
    width: 80%;
  }

  &-name {
    width: 100%;
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &-price {
    font-weight: 500;
    width: 40%;
  }

  &-quantity {
    width: 40%;
  }

  &-button {
    width: 10%;
  }
}
</style>