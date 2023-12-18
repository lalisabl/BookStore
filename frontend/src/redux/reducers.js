const initialState = {
  isScrolled: false,
  isList: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCROLL_STATE":
      return {
        ...state,
        isScrolled: action.payload,
      };
    case "SET_VIEW_TYPE":
      return {
        ...state,
        isList: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
