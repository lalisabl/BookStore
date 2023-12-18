
const initialState = {
  isScrolled: false,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SCROLL_STATE":
      return {
        ...state,
        isScrolled: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
