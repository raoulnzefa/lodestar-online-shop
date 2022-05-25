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
  name: "lode-input",
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

  &--default {
    height: auto;
    min-height: 2.5rem;
    border: 1px solid $grey;
  }

  &--header-search {
    width: calc(100% - 26rem);

    @include for-tablet-portrait-down {
      & {
        width: calc(100% - 22rem);
      }
    }

    @include for-phone-down {
      & {
        width: calc(100% - 26rem);
      }
    }

    @include for-small-phone-down {
      & {
        width: calc(100% - 22rem);
      }
    }
  }

  &--login {
    height: auto;
    border: 1px solid $grey;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;

    line-height: 1;
  }
}
</style>