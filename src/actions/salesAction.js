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
  GET_SALES,
  GET_SALES_FAILED,
  ADD_SALES,
  ADD_SALES_FAILED,
  ADD_SALES_RETURN,
  ADD_SALES_RETURN_FAILED,
  GET_SALES_USING_PRODUCTNAME,
  GET_SALES_USING_PRODUCTNAME_FAILED,
  CLEAR_SALES_ERRORS,
  RECEIVED_PAYMENT,
  RECEIVED_PAYMENT_FAILED,

  // filter
  FILTER_ADD_SALES,
  CLEAR_FILTER_ADD_SALES,
  FILTER_SALES_RETURN,
  CLEAR_FILTER_SALES_RETURN,
  FILTER_CUSTOMER,
  CLEAR_FILTER_CUSTOMER,

  // msg
  CLEAR_MSG,
  CLEAR_TRANSACTION_STATE
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

// get sales
export const getSales = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/sales`);
    dispatch({ type: GET_SALES, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_SALES_FAILED,
      payload: err.response.data.msg
    });
  }
};

// get sales using product name
export const getSalesUsingProduct = productName => async dispatch => {
  try {
    const res = await axios.get(`${url}/sales?product=${productName}`);
    dispatch({ type: GET_SALES_USING_PRODUCTNAME, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_SALES_USING_PRODUCTNAME_FAILED,
      payload: err.response.data.msg
    });
  }
};

// add sales
export const addSales = formData => async dispatch => {
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

// add sales return
export const addSalesReturn = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${url}/salesreturn`, formData, config);
    dispatch({
      type: ADD_SALES_RETURN,
      payload: { res: res.data, productId: formData.productId }
    });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: ADD_SALES_RETURN_FAILED,
      payload: err.response.data.msg
    });
  }
};

// received payment
export const receivedPayment = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`${url}/receivedpayment`, formData, config);
    dispatch({ type: RECEIVED_PAYMENT, payload: res.data });
  } catch (err) {
    dispatch({
      type: RECEIVED_PAYMENT_FAILED,
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

// filter customer
export const filterCustomer = text => dispatch => {
  console.log("called");
  dispatch({ type: FILTER_CUSTOMER, payload: text });
};

// clear add sales filter
export const clearFilterSalesReturn = text => dispatch => {
  dispatch({ type: CLEAR_FILTER_SALES_RETURN });
};

// clear customer filter
export const clearFilterCustomer = text => dispatch => {
  dispatch({ type: CLEAR_FILTER_CUSTOMER });
};

// Clear Errors
export const clearSalesErrors = () => {
  return {
    type: CLEAR_SALES_ERRORS
  };
};

// Clear msg
export const clearMsg = () => {
  return {
    type: CLEAR_MSG
  };
};

// Clear transaction state
export const clearTransactionState = () => {
  return {
    type: CLEAR_TRANSACTION_STATE
  };
};
