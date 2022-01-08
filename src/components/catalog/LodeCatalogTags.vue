<template>
  <div
    :class="{'lode-catalog__tags--active': TAGS.length}"
    class="lode-catalog__tags"
  >
    <transition-group name="tag-items">
      <div
        v-for="(tag, index) in TAGS"
        :key="tag.id"
        @mouseenter="SHOW_TAG_DELETE_BUTTON({index, bool: true})"
        @mouseleave="SHOW_TAG_DELETE_BUTTON({index, bool: false})"
        class="lode-catalog__tags-item"
      >
        <p class="lode-catalog__tags-name">{{tag.name}}</p>
        <transition name="tag-delete-btn">
          <lode-button
            v-show="tag.showDeleteButton"
            @click="removeTagAndFilterProducts(index)"
            class="btn--delete-tag"
          >X</lode-button>
        </transition>
      </div>
    </transition-group>
    <p
      @click="removeAllTagsAndFilterProducts"
      class="lode-catalog__tags-clear"
    >Очистить фильтр</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "lode-catalog-tags",
  computed: {
    ...mapGetters(["TAGS"]),
  },
  methods: {
    ...mapActions([
      "FILTER_PRODUCTS",
      "SHOW_TAG_DELETE_BUTTON",
      "REMOVE_TAG",
      "REMOVE_ALL_TAGS",
    ]),
    removeTagAndFilterProducts(index) {
      this.REMOVE_TAG(index);
      this.FILTER_PRODUCTS();
    },
    removeAllTagsAndFilterProducts() {
      this.REMOVE_ALL_TAGS();
      this.FILTER_PRODUCTS();
    },
  },
};
</script>

<style lang="scss">
.lode-catalog {
  &__tags {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    grid-area: tags;
    height: 3rem;
    margin: 1rem 0;
    padding: 0 1rem;

    border: 1px solid $grey-light;
    border-radius: 1.5rem;

    transition: box-shadow 0.1s linear, border-color 0.1s linear;

    &--active {
      border-color: $grey;
      box-shadow: 0 0 10px $grey-shadow;
    }

    &-item {
      display: inline-flex;
      padding: 0 0.5rem;
      margin-right: 1rem;
      width: auto;

      border: 1px solid $accent;
      border-radius: 1.5rem;

      line-height: 1.6;

      transition: box-shadow 0.1s linear, width 0.5s linear;

      &:hover {
        box-shadow: 0 0 5px $accent-shadow;
      }
    }

    &-name {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }

    &-clear {
      position: absolute;
      right: 1rem;
      bottom: 50%;
      z-index: 1;

      transform: translateY(50%);
      color: $grey-light;
      transition: all 0.1s linear;

      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      .lode-catalog__tags--active > & {
        cursor: pointer;
        color: $grey;

        &:hover {
          color: $black;
          text-decoration: underline;
        }
      }
    }
  }
}

.tag {
  &-delete-btn,
  &-items {
    &-enter-active,
    &-leave-active {
      transition: all 0.3s ease;
    }

    &-move {
      transition: transform 0.3s ease;
    }
  }

  &-delete-btn {
    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateX(-1rem);
    }
  }

  &-items {
    &-enter-from,
    &-leave-to {
      opacity: 0;
      transform: translateY(-3rem);
    }
  }
}
</style>