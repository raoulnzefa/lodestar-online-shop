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

  /* Catalog buttons */
  &--add-to-cart {
    background-color: $accent;
    border-radius: 1.6em;
    border: 2px solid $accent;

    color: #fff;

    text-transform: uppercase;

    &:hover {
      background-color: #fff;
      border: 2px solid $accent;
      color: $accent;
    }
  }

  /* Header-Cart Item's buttons */
  &--view-cart,
  &--make-deal {
    width: 100%;
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

  /* Cart Item's buttons */
  &--delete-from-cart {
    width: 5%;
    margin: 0;
    padding: 0;
    background-color: $accent;
    color: $white;
    border: 1px solid $black-light;

    &:hover {
      background-color: $white;
      color: $black;
      border: 1px solid $black;
    }
  }

  /* Search button */
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
  }
}
</style>