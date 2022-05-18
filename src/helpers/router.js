export const updateFilterPath = (router, filterQuery) => {
  router.push({
    path: "/catalog/filter",
    query: filterQuery
  });
}

export const updateSearchPath = (router, query) => {
  router.push({
    path: `/search`,
    query,
  });
}

export const getQueryStringWithinRouterHook = (to) => {
  return "?" + to.href.split("?")[1];
}

export const deleteLastRouterQuery = (query) => {
  const entries = Object.entries(query);
  return Object.fromEntries(entries.splice(0, entries.length - 1));
}