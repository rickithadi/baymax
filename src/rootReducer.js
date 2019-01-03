import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/books";

const usersDefaultState = [];
const DefaultState = [];

export default combineReducers({
  user,
  books
});
