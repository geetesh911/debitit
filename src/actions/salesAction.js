import {
  // customers
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED,
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAILED,
  ADD_CUSTOMER,
  ADD_CUSTOMER_FAILED,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAILED,
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_FAILED,

  // sales
  ADD_SALES,
  ADD_SALES_FAILED,
  CLEAR_SALES_ERRORS,

  // filter
  FILTER_ADD_SALES,
  CLEAR_FILTER_ADD_SALES,
  FILTER_SALES_RETURN,
  CLEAR_FILTER_SALES_RETURN
} from "./types";
import axios from "axios";

let url = "";
if (process.env.NODE_ENV !== "production") {
  url = "http://localhost:5000/api";
} else {
  url = "https://debitit-api.herokuapp.com/api";
}

// get customers
export const getCustomers = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/customer`);
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CUSTOMERS_FAILED,
      payload: err.response.msg
    });
  }
};

// get customer
export const getCustomer = id => async dispatch => {
  try {
    const res = await axios.get(`${url}/customer/${id}`);
    dispatch({
      type: GET_CUSTOMER,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CUSTOMER_FAILED,
      payload: err.response.msg
    });
  }
};

// add customer
export const addCustomer = formData => async dispatch => {
  formData.name = formData.name.trim();
  formData.mobile = formData.mobile.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`${url}/customer`, formData, config);
    dispatch({ type: ADD_CUSTOMER, payload: res.data });
  } catch (err) {
    dispatch({
      type: ADD_CUSTOMER_FAILED,
      payload: err.response.data.msg
    });
  }
};

// edit customer
export const editCustomer = (formData, id) => async dispatch => {
  formData.name = formData.name.trim();
  formData.mobile = formData.mobile.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put(`${url}/customer/${id}`, formData, config);
    dispatch({ type: EDIT_CUSTOMER, payload: res.data });
  } catch (err) {
    dispatch({
      type: EDIT_CUSTOMER_FAILED,
      payload: err.response.data.msg
    });
  }
};

// delete customer
export const deleteCustomer = id => async dispatch => {
  try {
    await axios.delete(`${url}/customer/${id}`);
    dispatch({ type: DELETE_CUSTOMER, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_CUSTOMER_FAILED, payload: err.response.data.msg });
  }
};

// add sales
export const addSales = formData => async dispatch => {
  formData.productName = formData.productName.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${url}/sales`, formData, config);
    dispatch({
      type: ADD_SALES,
      payload: { res: res.data, productId: formData.productId }
    });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: ADD_SALES_FAILED,
      payload: err.response.data.msg
    });
  }
};

// filter add sales
export const filterAddSales = text => dispatch => {
  dispatch({ type: FILTER_ADD_SALES, payload: text });
};

// clear add sales filter
export const clearFilterAddSales = text => dispatch => {
  dispatch({ type: CLEAR_FILTER_ADD_SALES });
};

// filter add sales
export const filterSalesReturn = text => dispatch => {
  dispatch({ type: FILTER_SALES_RETURN, payload: text });
};

// clear add sales filter
export const clearFilterSalesReturn = text => dispatch => {
  dispatch({ type: CLEAR_FILTER_SALES_RETURN });
};

// Clear Errors
export const clearSalesErrors = () => {
  return {
    type: CLEAR_SALES_ERRORS
  };
};
