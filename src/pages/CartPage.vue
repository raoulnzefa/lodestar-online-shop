<template>
  <div class="cart-page">
    <lode-cart @openModal="isModalOpened = true" />
    <lode-modal
      @closeModal="isModalOpened = false"
      :isOpened="isModalOpened"
    >
      <lode-cart-order></lode-cart-order>
    </lode-modal>
  </div>
</template>

<script>
import LodeCart from "@/components/cart/LodeCart";
import LodeCartOrder from "@/components/cart/LodeCartOrder";
export default {
  components: {
    LodeCart,
    LodeCartOrder,
  },
  data() {
    return {
      isModalOpened: false,
    };
  },
  watch: {
    isModalOpened(value) {
      const body = document.querySelector("body");
      if (value) {
        window.scroll(0, 0);
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "";
      }
    },
  },
};
</script>

<style lang="scss">
</style>