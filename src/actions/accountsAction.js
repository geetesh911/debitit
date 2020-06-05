import {
  GET_CASH_DATA,
  GET_CASH_DATA_FAILED,
  GET_RANGE_CASH_DATA,
  GET_RANGE_CASH_DATA_FAILED,
  GET_BANK_DATA,
  GET_BANK_DATA_FAILED,
  GET_RANGE_BANK_DATA,
  GET_RANGE_BANK_DATA_FAILED,
  SET_ACCOUNTS_MSG,
  CLEAR_ACCOUNTS_MSG,
} from "./types";
import axios from "axios";

let url = "";
if (process.env.NODE_ENV !== "production") {
  url = "http://localhost:5000/api";
} else {
  url = "https://debitit-api.herokuapp.com/api";
}

// get cash data
export const getCashData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/cash`);
    dispatch({
      type: GET_CASH_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_CASH_DATA_FAILED,
      payload: err.response.data.msg,
    });
  }
};

// get range cash data
export const getRangeCashData = (lRange, uRange) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${url}/cash/range?lRange=${lRange}&uRange=${uRange}`
    );
    let dataNotFound = false;
    if (res.data.length === 0) dataNotFound = true;

    dispatch({
      type: GET_RANGE_CASH_DATA,
      payload: { res: res.data, dataNotFound },
    });
  } catch (err) {
    dispatch({
      type: GET_RANGE_CASH_DATA_FAILED,
      payload: err.response.data.msg,
    });
  }
};

// get bank data
export const getBankData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/bank`);
    dispatch({
      type: GET_BANK_DATA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_BANK_DATA_FAILED,
      payload: err.response.data.msg,
    });
  }
};

// get range bank data
export const getRangeBankData = (lRange, uRange) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${url}/bank/range?lRange=${lRange}&uRange=${uRange}`
    );
    let dataNotFound = false;
    if (res.data.length === 0) dataNotFound = true;

    dispatch({
      type: GET_RANGE_BANK_DATA,
      payload: { res: res.data, dataNotFound },
    });
  } catch (err) {
    dispatch({
      type: GET_RANGE_BANK_DATA_FAILED,
      payload: err.response.data.msg,
    });
  }
};

// Clear msg
export const setAccountsMsg = (msg) => {
  return {
    type: SET_ACCOUNTS_MSG,
    payload: msg,
  };
};

// Clear msg
export const clearAccountsMsg = () => {
  return {
    type: CLEAR_ACCOUNTS_MSG,
  };
};
