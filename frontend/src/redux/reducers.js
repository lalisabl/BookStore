const initialState = {
  isScrolled: false,
  isList: false,
  isLogin: false,
  userInfo: [],
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
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
