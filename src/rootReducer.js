import { combineReducers } from "redux";

import user from "./reducers/user";
import books from "./reducers/books";
import workouts from "./reducers/workouts";
import exercises from "./reducers/exercises";
import teams from "./reducers/teams";
import organisations from "./reducers/organisations";

export default combineReducers({
    user,
    books,
    workouts,
    organisations,
    teams,
    exercises
});
