<template>
  <div
    v-if="isOpened"
    class="lode-modal"
    @click.self="closeModal"
  >
    <div class="lode-modal__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "lode-modal",
  props: {
    isOpened: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
  emits: {
    closeModal: {
      type: null,
    },
  },
};
</script>

<style lang="scss">
.lode-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;
  background-color: $black-half;

  &__inner {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, -50%);

    padding: 3rem;
    margin: 0 auto;
    width: 80vw;
    height: 80vh;

    background-color: $white;
    box-shadow: $modal-shadow;
  }
}
</style>