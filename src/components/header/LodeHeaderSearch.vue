<template>
  <form action="">
    <select
      class="lode-header__search-select"
      v-model="searchCategory"
      name="category"
    >
      <option
        v-for="category in CATEGORIES"
        :value="category.value"
        :key="category.value"
      >{{category.name}}</option>

    </select>
    <lode-input
      class="input--header-search"
      v-model="modelValue"
      placeholder="Поиск"
    />
    <lode-button
      @click.prevent=""
      class="btn--search"
    >Поиск</lode-button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LodeHeaderSearch",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["SEARCH_FORM", "CATEGORIES"]),
    // ! Two-way Computed Property (modelValue, searchCategory)
    // ! to be able to use v-model with Vuex data
    modelValue: {
      get() {
        return this.SEARCH_FORM.text;
      },
      set(value) {
        this.CHANGE_SEARCH_TEXT(value);
      },
    },
    searchCategory: {
      get() {
        return this.SEARCH_FORM.category;
      },
      set(value) {
        this.CHANGE_SEARCH_CATEGORY(value);
      },
    },
  },
  methods: {
    ...mapActions(["CHANGE_SEARCH_CATEGORY", "CHANGE_SEARCH_TEXT"]),
  },
};
</script>

<style lang='scss'>
.lode-header__search {
  &-select {
    padding: 0px 1.5rem;
    background: $white;
    border: 1px solid $grey;
    height: 40px;

    border-radius: 4rem 0px 0px 4rem;
  }
}
</style>