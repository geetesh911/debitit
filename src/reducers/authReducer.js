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
} from "../actions/types";

const initialState = {
  token: document.cookie.split("=")[1],
  isAuthenticated: null,
  loading: false,
  user: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // localStorage.setItem("token", action.payload.token);
      document.cookie = `token=${action.payload.token}; expires=Thu, 18 Dec 9999 12:00:00 UTC;`;

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAILED:
    case AUTH_FAILED:
    case LOGIN_FAILED:
    case LOGOUT:
      document.cookie = `token=; expires=Thu, 18 Dec 9999 12:00:00 UTC;`;

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
