<template>
  <form action="">
    <select
      class="lode-header__search-select"
      v-model="searchForm.category"
      name="category"
    >
      <option
        v-for="category in categories"
        :value="category.value"
        :key="category.value"
      >{{category.name}}</option>

    </select>
    <lode-input
      class="input--header-search"
      v-model="searchForm.text"
      placeholder="Поиск"
    />
    <lode-button
      @click.prevent=""
      class="btn--search"
    >Поиск</lode-button>
  </form>
</template>

<script>
export default {
  name: "LodeHeaderSearch",
  data() {
    return {
      searchForm: {
        category: "all",
        text: "",
      },
      categories: [
        {
          name: "Все категории",
          value: "all",
        },
        {
          name: "Галогенные",
          value: "halogen",
        },
        {
          name: "Ксеноновые",
          value: "xenon",
        },
        {
          name: "Светодиодные",
          value: "led",
        },
        {
          name: "Накал",
          value: "incandescent",
        },
      ],
      selected: "Все категории",
    };
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