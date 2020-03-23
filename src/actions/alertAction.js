import { SET_ALERT, REMOVE_ALERT } from "./types";
import { uuid } from "uuidv4";

// Set Alert
export const setAlert = (msg, type, timeout = 5000) => dispatch => {
  console.log("called");
  const id = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
