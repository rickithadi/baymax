import {USER_DETAILS, USER_LOGGED_IN, USER_LOGGED_OUT,USER_UPDATED } from "../types";
import api from "../api";
import setAuthorizationHeader from "../utils/setAuthorizationHeader";
import {clearBooks} from "./books.js";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});
export const userUpdated = user => ({
  type: USER_UPDATED,
  user
});
export const userDetails = user => ({
  type: USER_DETAILS,
  user
});
export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
    state:[]
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
  console.log('logged in',user)
    localStorage.bookwormJWT = user.token;
    setAuthorizationHeader(user.token);
  console.log('dispatching',user)
    dispatch(userLoggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("bookwormJWT");
  setAuthorizationHeader();
  dispatch(userLoggedOut());
    // dispatch(clearBooks());
};

export const confirm = token => dispatch =>
  api.user.confirm(token).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });

export const resetPasswordRequest = ({ email }) => () =>
  api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);
