import { GET_CASH_DATA, GET_CASH_DATA_FAILED } from "./types";
import axios from "axios";

let url = "";
if (process.env.NODE_ENV !== "production") {
  url = "http://localhost:5000/api";
} else {
  url = "https://debitit-api.herokuapp.com/api";
}

// get creditors
export const getCashData = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/cash`);
    dispatch({
      type: GET_CASH_DATA,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CASH_DATA_FAILED,
      payload: err.response.msg
    });
  }
};
