export const updateFilterPath = (context, filterQuery) => {
  context.$router.push({
    path: "/catalog/filter",
    query: filterQuery
  });
}

export const updateSearchPath = (context) => {
  context.$router.push({
    path: `/search`,
    query: {
      category: context.selectedCategoryId,
      text: context.searchText,
    },
  });
}

export const getQueryStringWithinRouterHook = (to) => {
  return "?" + to.href.split("?")[1];
}

export const deleteLastRouterQuery = (query) => {
  const entries = Object.entries(query);
  return Object.fromEntries(entries.splice(0, entries.length - 1));
}