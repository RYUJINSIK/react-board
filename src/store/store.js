import { createStore } from "redux";
import { pageReducer } from "../reducers/reducers";

const store = createStore(pageReducer);

export default store;
