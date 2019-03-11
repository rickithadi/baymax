import {schema} from 'normalizr';

export const bookSchema = new schema.Entity('books', {}, {idAttribute: '_id'});
export const userSchema = new schema.Entity('user', {}, {idAttribute: '_id'});

export const workoutSchema = new schema.Entity(
  'workouts',
  {},
  {idAttribute: '_id'},
);
export const exerciseSchema = new schema.Entity(
  'exercises',
  {},
  {idAttribute: '_id'},
);

export const organisationSchema = new schema.Entity(
  'organisations',
  {},
  {idAttribute: '_id'},
);
export const teamSchema = new schema.Entity('teams', {}, {idAttribute: '_id'});
