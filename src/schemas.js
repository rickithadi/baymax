import { schema } from "normalizr";

export const bookSchema = new schema.Entity(
  "books",
  {},
  { idAttribute: "_id" }
);

export const workoutSchema = new schema.Entity(
    "workouts",
    {},
    { idAttribute: "_id" }
);