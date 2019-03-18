import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('/api/auth', {credentials}).then(res => res.data.user),
    signup: user => axios.post('/api/users', {user}).then(res => res.data.user),
    update: user =>
      axios.post('/api/users/update', {user}).then(res => res.data.user),
    details: user =>
      axios.post('/api/users/details', {user}).then(res => res.data.user),
    confirm: token =>
      axios.post('/api/auth/confirmation', {token}).then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post('/api/auth/reset_password_request', {email}),
    validateToken: token => axios.post('/api/auth/validate_token', {token}),
    resetPassword: data => axios.post('/api/auth/reset_password', {data}),
  },
  // get by userid
  books: {
    fetchAll: () => axios.get('/api/books').then(res => res.data.books),
    fetchSingle: id => axios.get('/api/books').then(res => res.data.books),
    create: book => axios.post('/api/books', {book}).then(res => res.data.book),
  },
  workouts: {
    fetchAll: () => axios.get('/api/workouts').then(res => res.data.workouts),
    create: workout =>
      axios.post('/api/workouts', {workout}).then(res => res.data.workout),
    delete: workout =>
      axios.post('/api/workouts', {workout}).then(res => res.data.workout),
  },
  exercises: {
    fetch_workoutId: workoutId =>
      axios.get('api/workouts/exercises').then(res => res.data.exercises),
    fetchAll: () =>
      axios.get('api/workouts/exercises').then(res => res.data.exercises),
    create: (exercises, workoutId) =>
      axios
        .post('/api/workouts/exercise', {exercises, workoutId})
        .then(res => res.data.exercise),
  },
  organisations: {
    fetch_organisations: () =>
      axios.get('api/organisations').then(res => res.data.organisations),
    create_organisation: organisation =>
      axios.get('api/organisations').then(res => res.data.organisation),
  },
  teams: {
    fetch_teams: () => axios.get('api/teams').then(res => res.data.teams),
    create_team: (organisationId, team) =>
      axios.post('api/teams').then(res => res.data.teams),
  },
};
