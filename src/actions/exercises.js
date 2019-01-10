
import { normalize } from "normalizr";
import {EXERCISE_DELETED,EXERCISE_MODIFIED, EXERCISES_FETCHED,EXERCISES_CLEARED, EXERCISE_CREATED } from "../types";
import api from "../api";
import { exerciseSchema } from "../schemas";

// data.entities.exercises
const exercisesFetched = data => ({
    type: EXERCISES_FETCHED,
    data
});
const exerciseDeleted = data => ({
    type: EXERCISE_DELETED,
    data
});
const exerciseCreated = data => ({
    type: EXERCISE_CREATED,
    data
});
const exerciseModified = data => ({
    type: EXERCISE_MODIFIED,
    data
});
const exerciseCleared = data => ({
    type: EXERCISES_CLEARED,
    data: undefined 
});

export const clearExercises = () => dispatch=> {dispatch(exerciseCleared());};

export const fetchExercises = () => dispatch =>
    api.exercises
    .fetchAll()
    .then(exercises => dispatch(exercisesFetched(normalize(exercises, [exerciseSchema]))))
    .catch(err => console.error(err));


export const createExercise =(exercises,w_id) => dispatch =>
    api.exercises
    .create(exercises,w_id)
    .then(exercises =>{console.log('nigeroni',exercises);
                           dispatch(exerciseCreated(normalize(exercises, exerciseSchema)));
                      });
