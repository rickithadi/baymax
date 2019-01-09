import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
    // get by userid
  books: {
    fetchAll: () => axios.get("/api/books").then(res => res.data.books),
     fetchSingle: id  => axios.get("/api/books").then(res => res.data.books),
    create: book =>
      axios.post("/api/books", { book }).then(res => res.data.book)
  },
    workouts:{
        fetchAll: () => axios.get("/api/workouts").then(res => res.data.workouts),
        create: workout =>
            axios.post("/api/workouts", { workout }).then(res => res.data.workout),
        delete: workout=>
            axios.post("/api/workouts",{workout}).then(res=>res.data.workout)
 
    },
    exercises:{
        fetchList:()=> axios.get("/exercises"),
        fetchAll:()=> axios.get("api/workouts/exercises")
            .then(res=> res.data.exercises),
        create: (exercises,workoutId) =>
            axios.post("/api/workouts/exercise", { exercises,workoutId }).then(res => res.data.exercise),
        

    }
};
