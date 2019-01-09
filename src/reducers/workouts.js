import { createSelector } from "reselect";
import {WORKOUT_DELETED,WORKOUT_MODIFIED, WORKOUTS_FETCHED,WORKOUTS_CLEARED, WORKOUT_CREATED } from "../types";


export default function workouts(state = {}, action = {}) {
    switch (action.type) {
    case WORKOUTS_FETCHED:
    case WORKOUT_CREATED:
        return { ...state, ...action.data.entities.workouts };
    case WORKOUTS_CLEARED:
        return {...action.state};
    default:
        return state;
    }
}


// data.entities.workouts
export const workoutSelector = state => state.workouts;

export const allWorkoutsSelector = createSelector(workoutSelector, workoutsHash =>
                                               Object.values(workoutsHash)
                                              );
