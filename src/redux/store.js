import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Reducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const myStore = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default myStore;
