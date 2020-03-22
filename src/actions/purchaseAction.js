import {
  GET_PURCHASE,
  GET_PURCHASE_FAILED,
  GET_PURCHASE_USING_PRODUCTNAME,
  GET_PURCHASE_USING_PRODUCTNAME_FAILED,
  SAVE_NEW_PURCHASE,
  SAVE_NEW_PURCHASE_FAILED,
  SAVE_EXISTING_PURCHASE,
  SAVE_EXISTING_PURCHASE_FAILED,
  ADD_NEW_PRODUCT,
  ADD_NEW_PRODUCT_FAILED,
  GET_PRODUCTS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT,
  GET_PRODUCT_FAILED,
  EDIT_PRODUCT,
  EDIT_PRODUCT_FAILED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAILED,
  FILTER_CARDS,
  CLEAR_FILTER_CARDS,
  ADD_PURCHASE_RETURN,
  ADD_PURCHASE_RETURN_FAILED,
  GET_CREDITORS,
  GET_CREDITORS_FAILED,
  GET_CREDITOR,
  GET_CREDITOR_FAILED,
  ADD_CREDITOR,
  ADD_CREDITOR_FAILED,
  EDIT_CREDITOR,
  EDIT_CREDITOR_FAILED,
  DELETE_CREDITOR,
  DELETE_CREDITOR_FAILED,
  CLEAR_ERRORS,
  FILTER_PURCHASE_EXISTING_PRODUCT,
  CLEAR_FILTER_PURCHASE_EXISTING_PRODUCT,
  CLEAR_FILTER_EDIT_PRODUCT,
  FILTER_EDIT_PRODUCT,
  FILTER_DELETE_PRODUCT,
  CLEAR_FILTER_DELETE_PRODUCT,
  FILTER_PURCHASE_RETURN
} from "../actions/types";
import axios from "axios";
import { CLEAR_FILTER_PURCHASE_RETURN } from "./types";

const url = "https://debitit-api.herokuapp.com/api";

// add new purchase
export const addNewPurchase = formData => async dispatch => {
  formData.productName = formData.productName.trim();
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${url}/purchase`, formData, config);
    dispatch({ type: SAVE_NEW_PURCHASE, payload: res.data });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: SAVE_NEW_PURCHASE_FAILED,
      payload: err.response.data.msg
    });
  }
};

// add existing purchase
export const addExistingPurchase = formData => async dispatch => {
  formData.productName = formData.productName.trim();
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${url}/purchase`, formData, config);
    dispatch({
      type: SAVE_EXISTING_PURCHASE,
      payload: { res: res.data, productId: formData.productId }
    });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: SAVE_EXISTING_PURCHASE_FAILED,
      payload: err.response.data.msg
    });
  }
};

// get purchases
export const getPurchases = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/purchase`);
    dispatch({ type: GET_PURCHASE, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_PURCHASE_FAILED,
      payload: err.response.data.msg
    });
  }
};

// get purchases using product name
export const getPurchaseUsingProduct = productName => async dispatch => {
  try {
    const res = await axios.get(`${url}/purchase?product=${productName}`);
    dispatch({ type: GET_PURCHASE_USING_PRODUCTNAME, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_PURCHASE_USING_PRODUCTNAME_FAILED,
      payload: err.response.data.msg
    });
  }
};

export const addPurchaseReturn = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${url}/purchasereturn`, formData, config);
    dispatch({
      type: ADD_PURCHASE_RETURN,
      payload: { res: res.data, productId: formData.productId }
    });
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch({
      type: ADD_PURCHASE_RETURN_FAILED,
      payload: err.response.data.msg
    });
  }
};

// get product
export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/product`);
    dispatch({ type: GET_PRODUCTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_FAILED,
      payload: err.response.data.msg
    });
  }
};

// post product
export const addNewProduct = formData => async dispatch => {
  formData.productName = formData.productName.trim();
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(`${url}/product`, formData, config);
    dispatch({ type: ADD_NEW_PRODUCT, payload: res.data });
  } catch (err) {
    dispatch({
      type: ADD_NEW_PRODUCT_FAILED,
      payload: err.response.data.msg
    });
  }
};

// get creditors
export const getCreditors = () => async dispatch => {
  try {
    const res = await axios.get(`${url}/creditor`);
    dispatch({
      type: GET_CREDITORS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CREDITORS_FAILED,
      payload: err.response.msg
    });
  }
};

// get creditor
export const getCreditor = id => async dispatch => {
  try {
    const res = await axios.get(`${url}/creditor/${id}`);
    dispatch({
      type: GET_CREDITOR,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CREDITOR_FAILED,
      payload: err.response.msg
    });
  }
};

// add creditor
export const addCreditor = formData => async dispatch => {
  formData.name = formData.name.trim();
  formData.contact = formData.contact.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.post(`${url}/creditor`, formData, config);
    dispatch({ type: ADD_CREDITOR, payload: res.data });
  } catch (err) {
    dispatch({
      type: ADD_CREDITOR_FAILED,
      payload: err.response.data.msg
    });
  }
};

// edit creditor
export const editCreditor = (formData, id) => async dispatch => {
  formData.name = formData.name.trim();
  formData.contact = formData.contact.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put(`${url}/creditor/${id}`, formData, config);
    dispatch({ type: EDIT_CREDITOR, payload: res.data });
  } catch (err) {
    dispatch({
      type: EDIT_CREDITOR_FAILED,
      payload: err.response.data.msg
    });
  }
};

// delete creditor
export const deleteCreditor = id => async dispatch => {
  try {
    await axios.delete(`${url}/creditor/${id}`);
    dispatch({ type: DELETE_CREDITOR, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_CREDITOR_FAILED, payload: err.response.data.msg });
  }
};

// delete creditor
export const deleteProduct = id => async dispatch => {
  try {
    await axios.delete(`${url}/product/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (err) {
    dispatch({ type: DELETE_PRODUCT_FAILED, payload: err.response.data.msg });
  }
};

// get product
export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`${url}/product/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT_FAILED,
      payload: err.response.msg
    });
  }
};

// edit product
export const editProduct = (formData, id) => async dispatch => {
  formData.productName = formData.productName.trim();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  try {
    const res = await axios.put(`${url}/product/${id}`, formData, config);
    dispatch({ type: EDIT_PRODUCT, payload: res.data });
  } catch (err) {
    dispatch({
      type: EDIT_PRODUCT_FAILED,
      payload: err.response.data.msg
    });
  }
};

// Filter product
export const filterProduct = text => dispatch => {
  dispatch({ type: FILTER_CARDS, payload: text });
};

// Filter product
export const filterExistingPurchase = text => dispatch => {
  dispatch({ type: FILTER_PURCHASE_EXISTING_PRODUCT, payload: text });
};

// Filter edit product
export const filterEditProduct = text => dispatch => {
  dispatch({ type: FILTER_EDIT_PRODUCT, payload: text });
};

// Filter delete product
export const filterDeleteProduct = text => dispatch => {
  dispatch({ type: FILTER_DELETE_PRODUCT, payload: text });
};

// Filter purchase return products
export const filterPurcahseReturn = text => dispatch => {
  dispatch({ type: FILTER_PURCHASE_RETURN, payload: text });
};

// Clear Filter
export const clearFilterCards = () => dispatch => {
  dispatch({ type: CLEAR_FILTER_CARDS });
};

// Clear Filter
export const clearFilterExistingPurchase = () => dispatch => {
  dispatch({ type: CLEAR_FILTER_PURCHASE_EXISTING_PRODUCT });
};

// Clear Edit product filter
export const clearEditProductFilter = () => dispatch => {
  dispatch({ type: CLEAR_FILTER_EDIT_PRODUCT });
};

// Clear delete product filter
export const clearDeleteProductFilter = () => dispatch => {
  dispatch({ type: CLEAR_FILTER_DELETE_PRODUCT });
};

// Clear purchase return product filter
export const clearPurchaseReturnFilter = () => dispatch => {
  dispatch({ type: CLEAR_FILTER_PURCHASE_RETURN });
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
