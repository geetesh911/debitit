import axios from "axios";
import {
  GET_CATEGORY,
  GET_CATEGORY_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  ADD_CATEGORY,
  ADD_CATEGORY_FAILED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_FAILED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILED,
  GET_EXPENSES,
  GET_EXPENSES_FAILED,
  ADD_EXPENSE,
  ADD_EXPENSE_FAILED,
  CLEAR_OTHERS_MSG
} from "../actions/types";

let url = "";
if (process.env.NODE_ENV !== "production") {
  url = "http://localhost:5000/api";
} else {
  url = "https://debitit-api.herokuapp.com/api";
}

// get categories
export const getExpenseCategories = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/expensecategory`);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES_FAILED,
      payload: err.response.msg
    });
  }
};

// get category
export const getExpenseCategory = id => async dispatch => {
  try {
    const res = await axios.get(`${url}/expensecategory/${id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_FAILED,
      payload: err.response.msg
    });
  }
};

// add categories
export const addExpenseCategories = formData => async dispatch => {
  formData.name = formData.name.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`${url}/expensecategory`, formData, config);
    dispatch({ type: ADD_CATEGORY, payload: res.data });
  } catch (err) {
    dispatch({
      type: ADD_CATEGORY_FAILED,
      payload: err.response.data.msg
    });
  }
};

// edit category
export const editExpenseCategory = (formData, id) => async dispatch => {
  formData.name = formData.name.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put(
      `${url}/expensecategory/${id}`,
      formData,
      config
    );
    dispatch({ type: EDIT_CATEGORY, payload: res.data });
  } catch (err) {
    dispatch({
      type: EDIT_CATEGORY_FAILED,
      payload: err.response.data.msg
    });
  }
};

// delete customer
export const deleteExpenseCategory = id => async dispatch => {
  try {
    await axios.delete(`${url}/expensecategory/${id}`);
    dispatch({ type: DELETE_CATEGORY, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_CATEGORY_FAILED, payload: err.response.data.msg });
  }
};

// get expenses
export const getExpenses = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/expense`);
    dispatch({
      type: GET_EXPENSES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_EXPENSES_FAILED,
      payload: err.response.msg
    });
  }
};

// add expense
export const addExpense = formData => async dispatch => {
  formData.name = formData.name.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`${url}/expense`, formData, config);
    dispatch({ type: ADD_EXPENSE, payload: res.data });
  } catch (err) {
    dispatch({
      type: ADD_EXPENSE_FAILED,
      payload: err.response.data.msg
    });
  }
};

// Clear msg
export const clearOthersMsg = () => {
  return {
    type: CLEAR_OTHERS_MSG
  };
};
