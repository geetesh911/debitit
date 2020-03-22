import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_USER,
  AUTH_FAILED,
  SET_LOADING
} from "./types";
import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";

const url = "https://debitit-api.herokuapp.com/api";

export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get(`${url}/auth`);
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAILED });
  }
};

export const registerUser = formData => async dispatch => {
  setLoading();

  formData.name = formData.name.trim();
  formData.email = formData.email.trim();
  formData.password = formData.password.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`${url}/users`, formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    if (localStorage.token) setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`${url}/auth`);
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_FAILED });
    }
  } catch (err) {
    dispatch({ type: REGISTER_FAILED, payload: err.response.data.msg });
  }
};

// Login User
export const login = formData => async dispatch => {
  setLoading();

  formData.email = formData.email.trim();
  formData.password = formData.password.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`${url}/auth`, formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    if (localStorage.token) setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`${url}/auth`);
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_FAILED });
    }
  } catch (err) {
    dispatch({ type: LOGIN_FAILED, payload: err.response.data.msg });
  }
};

// Logout
export const logout = () => {
  return {
    type: LOGOUT
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Set Loading
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
