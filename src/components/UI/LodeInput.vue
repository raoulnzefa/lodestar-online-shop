<template>
  <input
    class="input"
    type="text"
    :value="modelValue"
    @input="updateModelValue($event.target.value)"
  >
</template>

<script>
export default {
  name: "LodeInput",
  props: {
    modelValue: {
      type: String,
      default() {
        return "";
      },
    },
  },
  methods: {
    updateModelValue(value) {
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<style lang="scss">
.input {
  height: 4rem;
  border: none;

  padding: 0px 1.5rem;
  background-color: $white;
  width: 100%;

  &--header-search {
    width: calc(100% - 26rem);
  }
}
</style>