const initialState = {
  isScrolled: false,
  isList: false,
  isLogin: false,
  userInfo: {},
  backBtn: false,
  isMobile: false,
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
    case "SET_BACK_BTN":
      return {
        ...state,
        backBtn: action.payload,
      };
    case "SET_MOBILE_VIEW":
      return {
        ...state,
        isMobile: action.payload,
      };

    default:
      return state;
  }
};

export default Reducer;
