import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/books";
import workouts from "./reducers/workouts";
import exercises from "./reducers/exercises";;

export default combineReducers({
    user,
    books,
    workouts,
    exercises
});
