import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  CLEAR_ERRORS,
  LOAD_USER,
  AUTH_FAILED,
  SET_LOADING,
} from "./types";
import axios from "axios";
import setAuthToken from "./../utils/setAuthToken";
import { getToken } from "./../utils/getToken";

let url = "";
if (process.env.NODE_ENV !== "production") {
  url = "http://localhost:5000/api";
} else {
  url = "https://debitit-api.herokuapp.com/api";
}

const token = getToken();

export const loadUser = () => async (dispatch) => {
  // if (localStorage.token) setAuthToken(localStorage.token);
  if (token) setAuthToken(token);

  try {
    const res = await axios.get(`${url}/auth`);
    dispatch({ type: LOAD_USER, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_FAILED });
  }
};

export const registerUser = (formData) => async (dispatch) => {
  setLoading();

  formData.name = formData.name.trim();
  formData.email = formData.email.trim();
  formData.password = formData.password.trim();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${url}/users`, formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });

    if (document.cookie && document.cookie.split("=")[1])
      setAuthToken(document.cookie.split("=")[1]);

    // try {
    //   const res = await axios.get(`${url}/auth`);
    //   dispatch({ type: LOAD_USER, payload: res.data });
    // } catch (err) {
    //   dispatch({ type: AUTH_FAILED });
    // }
  } catch (err) {
    dispatch({ type: REGISTER_FAILED, payload: err.response.data.msg });
  }
};

// Login User
export const login = (formData) => async (dispatch) => {
  setLoading();

  formData.email = formData.email.trim();
  formData.password = formData.password.trim();

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`${url}/auth`, formData, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    if (document.cookie && document.cookie.split("=")[1])
      setAuthToken(document.cookie.split("=")[1]);

    // try {
    //   const res = await axios.get(`${url}/auth`);
    //   dispatch({ type: LOAD_USER, payload: res.data });
    // } catch (err) {
    //   dispatch({ type: AUTH_FAILED });
    // }
  } catch (err) {
    dispatch({ type: LOGIN_FAILED, payload: err.response.data.msg });
  }
};

// Logout
export const logout = () => {
  console.log("run");
  return {
    type: LOGOUT,
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

// Set Loading
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
