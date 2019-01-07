import { normalize } from "normalizr";
import {WORKOUT_DELETED,WORKOUT_MODIFIED, WORKOUTS_FETCHED,WORKOUTS_CLEARED, WORKOUT_CREATED } from "../types";
import api from "../api";
import { workoutSchema } from "../schemas";

// data.entities.workouts
const workoutsFetched = data => ({
    type: WORKOUTS_FETCHED,
    data
});
const workoutDeleted = data => ({
    type: WORKOUT_DELETED,
    data
});
const workoutCreated = data => ({
    type: WORKOUT_CREATED,
    data
});
const workoutModified = data => ({
    type: WORKOUT_MODIFIED,
    data
});
const workoutCleared = data => ({
    type: WORKOUTS_CLEARED,
    data: undefined 
});

export const clearWorkouts = () => dispatch=> {dispatch(workoutCleared());};

export const fetchWorkouts = () => dispatch =>
    api.workouts
    .fetchAll()
    .then(workouts => dispatch(workoutsFetched(normalize(workouts, [workoutSchema]))))
    .catch(err => console.error(err));


export const createWorkout = data => dispatch =>
    api.workouts
    .create(data)
          .then(workout => dispatch(workoutCreated(normalize(workout, workoutSchema))))
          .catch(err => console.error(err));
