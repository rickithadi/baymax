import api from "../api";
import { userLoggedIn,userUpdated } from "./auth";

export const signup = data => dispatch =>
  api.user.signup(data).then(user => {
      console.log('signing up ', user);
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const update = user => dispatch =>
  api.user.update(user).then(user => {
    console.log('updating', user);
    // localStorage.bookwormJWT = user.token;
    dispatch(userUpdated(user));
  });
