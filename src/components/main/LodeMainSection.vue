<template>
  <div class="section">
    <div class="container">
      <h1 class="lode-main-section__title">
        <slot name="title"></slot>
      </h1>
      <div class="lode-main-section__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.lode-main-section {
  &__title {
    display: block;
    margin-bottom: 1rem;

    text-align: left;
    font-weight: 600;
    font-size: 1.8rem;
    text-transform: uppercase;
  }

  &__content {
    display: flex;
    justify-content: center;
  }
}
</style>