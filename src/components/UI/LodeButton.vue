<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "lode-button",
};
</script>

<style lang="scss">
.btn {
  display: inline-block;
  vertical-align: top;
  margin: 0 1.5rem;
  padding: 0.6em 1.4em;

  background-color: #fff;
  border: 1px solid $black;

  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.1em;

  transition: border 0.2s linear, color 0.2s linear,
    background-color 0.2s linear, transform 0.2s linear, opacity 0.2s linear;

  /* === Hover === */
  &--hover-lighten {
    &:hover {
      background-color: $accent-light;
      color: $white;
      border-color: $accent-light;
    }
  }

  &--hover-darker {
    &:hover {
      background-color: $grey-light;
    }
  }

  /* === Background color === */
  &--accent-color {
    background-color: $accent;
    border: $white;
    color: $white;
  }

  /* === Header buttons === */
  // Header-Cart
  &--view-cart,
  &--make-deal {
    width: 50%;
    margin: 0;
    border: none;
    line-height: 1.5rem;
    padding: 0.9em 0;
    letter-spacing: 0;
    transition: background-color 0.1s linear;
  }

  &--view-cart {
    background-color: $secondary;
    color: $white;

    &:hover {
      background-color: lighten($secondary, 8%);
    }
  }

  &--make-deal {
    background-color: $accent;
    color: $white;

    &:hover {
      background-color: lighten($accent, 8%);
    }
  }

  // Header Search
  &--search {
    margin: 0;
    height: 4rem;
    width: 10rem;

    border: none;
    border-radius: 0px 3em 3em 0px;
    background: $accent;

    color: $white;
    font-weight: 700;

    &:hover {
      background-color: $accent-light;
    }

    @include for-tablet-portrait-down {
      & {
        width: 8rem;
      }
    }

    @include for-phone-down {
      & {
        width: 10rem;
      }
    }

    @include for-small-phone-down {
      & {
        width: 8rem;
        padding: 0.6em 1em;
      }
    }
  }

  // UpperHeader
  &--upper-header {
    width: 100%;
    padding: 0.4em 1em;
    margin: 0 0 1rem 0;

    font-size: 1.3rem;
    background-color: $accent;
    color: $white;
  }
}
</style>