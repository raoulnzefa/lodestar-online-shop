<template>
  <select
    class="lode-header__search-select"
    v-model="searchForm.category"
    name="category"
    id=""
  >
    <option
      v-for="category in categories"
      value="all"
    ></option>

  </select>
</template>

<script>
export default {
  name: "LodeHeaderSearchSelect",
  props: {
    selected: {
      type: String,
      default() {
        return "";
      },
    },
    options: {
      type: Array,
      default() {
        return [];
      },
      required: true,
    },
  },
  data() {
    return {
      areOptionsVisible: false,
    };
  },
  methods: {},
};
</script>

<style>
</style>