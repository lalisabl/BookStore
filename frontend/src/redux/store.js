// store.js
import { createStore, combineReducers } from "redux";
import scrollReducer from "./reducers";

const rootReducer = combineReducers({
  scroll: scrollReducer,
});

const store = createStore(rootReducer);

export default store;
