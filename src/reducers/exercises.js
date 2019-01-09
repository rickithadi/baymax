import { createSelector } from "reselect";
import {EXERCISE_DELETED,EXERCISE_MODIFIED, EXERCISES_FETCHED,EXERCISES_CLEARED, EXERCISE_CREATED } from "../types";


export default function exercises(state = {}, action = {}) {
    switch (action.type) {
    case EXERCISES_FETCHED:
    case EXERCISE_CREATED:
        return { ...state, ...action.data.entities.exercises };
    case EXERCISES_CLEARED:
        return {...action.state};
    default:
        return state;
    }
}


// data.entities.exercises
export const exerciseSelector = state => state.exercises;

export const allExercisesSelector = createSelector(exerciseSelector, exercisesHash =>
                                                  Object.values(exercisesHash)
                                                 );
