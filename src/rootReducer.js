import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/books";
import workouts from "./reducers/workouts";


export default combineReducers({
    user,
    books,
    workouts
});
