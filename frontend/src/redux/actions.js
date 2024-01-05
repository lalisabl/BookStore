export const setScrollState = (isScrolled) => ({
  type: "SET_SCROLL_STATE",
  payload: isScrolled,
});

export const setListView = (isList) => ({
  type: "SET_VIEW_TYPE",
  payload: isList,
});

export const setLoginStatus = (isLogin) => ({
  type: "SET_LOGIN_STATUS",
  payload: isLogin,
});
export const setUserInfo = (userInfo) => ({
  type: "SET_USER_INFO",
  payload: userInfo,
});
export const setBackBtn = (backBtn) => ({
  type: "SET_BACK_BTN",
  payload: backBtn,
});

export const setSetIsMobile = (isMobile) => ({
  type: "SET_MOBILE_VIEW",
  payload: isMobile,
});