export const setScrollState = (isScrolled) => ({
  type: "SET_SCROLL_STATE",
  payload: isScrolled,
});

export const setListView = (isList) => ({
  type: "SET_VIEW_TYPE",
  payload: isList,
});
