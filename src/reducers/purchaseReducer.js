import {
  ADD_CREDITOR,
  ADD_CREDITOR_FAILED,
  GET_CREDITORS,
  GET_CREDITORS_FAILED,
  GET_CREDITOR,
  GET_CREDITOR_FAILED,
  DELETE_CREDITOR,
  DELETE_CREDITOR_FAILED,
  EDIT_CREDITOR,
  EDIT_CREDITOR_FAILED,
  GET_PURCHASE,
  GET_PURCHASE_FAILED,
  GET_PURCHASE_USING_PRODUCTNAME,
  GET_PURCHASE_USING_PRODUCTNAME_FAILED,
  ADD_PURCHASE_RETURN,
  ADD_PURCHASE_RETURN_FAILED,
  GET_PRODUCTS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT,
  GET_PRODUCT_FAILED,
  EDIT_PRODUCT,
  EDIT_PRODUCT_FAILED,
  CLEAR_ERRORS,
  FILTER_CARDS,
  CLEAR_FILTER_CARDS,
  FILTER_PURCHASE_EXISTING_PRODUCT,
  CLEAR_FILTER_PURCHASE_EXISTING_PRODUCT,
  SAVE_NEW_PURCHASE,
  SAVE_NEW_PURCHASE_FAILED,
  SAVE_EXISTING_PURCHASE,
  SAVE_EXISTING_PURCHASE_FAILED,
  ADD_NEW_PRODUCT,
  ADD_NEW_PRODUCT_FAILED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAILED,
  FILTER_EDIT_PRODUCT,
  CLEAR_FILTER_EDIT_PRODUCT,
  FILTER_DELETE_PRODUCT,
  CLEAR_FILTER_DELETE_PRODUCT,
  FILTER_PURCHASE_RETURN,
  CLEAR_FILTER_PURCHASE_RETURN
} from "../actions/types";

const initialState = {
  purchases: [],
  products: [],
  product: [],
  filtered: {
    productDetails: null,
    purchaseExistingProduct: null,
    editProducts: null,
    deleteProducts: null,
    purchaseReturn: null
  },
  purchaseUsingProduct: [],
  purchaseReturn: [],
  error: null,
  creditors: [],
  creditor: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CREDITORS:
      return {
        ...state,
        creditors: action.payload
      };
    case GET_CREDITOR:
      return {
        ...state,
        creditor: action.payload
      };
    case EDIT_CREDITOR:
      return {
        ...state,
        creditors: state.creditors.map(creditor => {
          if (creditor._id === action.payload._id) {
            return (creditor = action.payload);
          } else {
            return creditor;
          }
        }),
        creditor:
          state.creditor._id === action.payload._id
            ? action.payload
            : state.creditor
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product._id === action.payload._id) {
            return (product = action.payload);
          } else {
            return product;
          }
        }),
        product:
          state.product._id === action.payload._id
            ? action.payload
            : state.product
      };
    case FILTER_CARDS:
      return {
        ...state,
        filtered: {
          ...state.filtered,
          productDetails: state.products.filter(product => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return product.productName.match(regex);
          })
        }
      };
    case FILTER_PURCHASE_EXISTING_PRODUCT:
      return {
        ...state,
        filtered: {
          ...state.filtered,
          purchaseExistingProduct: state.products.filter(product => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return product.productName.match(regex);
          })
        }
      };
    case FILTER_EDIT_PRODUCT:
      return {
        ...state,
        filtered: {
          ...state.filtered,
          editProducts: state.products.filter(product => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return product.productName.match(regex);
          })
        }
      };
    case FILTER_DELETE_PRODUCT:
      return {
        ...state,
        filtered: {
          ...state.filtered,
          deleteProducts: state.products.filter(product => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return product.productName.match(regex);
          })
        }
      };
    case FILTER_PURCHASE_RETURN:
      return {
        ...state,
        filtered: {
          ...state.filtered,
          purchaseReturn: state.products.filter(product => {
            const regex = new RegExp(`${action.payload}`, "gi");
            return product.productName.match(regex);
          })
        }
      };
    case CLEAR_FILTER_CARDS:
      return {
        ...state,
        filtered: { ...state.filtered, productDetails: null }
      };
    case CLEAR_FILTER_PURCHASE_EXISTING_PRODUCT:
      return {
        ...state,
        filtered: { ...state.filtered, purchaseExistingProduct: null }
      };
    case CLEAR_FILTER_EDIT_PRODUCT:
      return {
        ...state,
        filtered: { ...state.filtered, editProducts: null }
      };
    case CLEAR_FILTER_DELETE_PRODUCT:
      return {
        ...state,
        filtered: { ...state.filtered, deleteProducts: null }
      };
    case CLEAR_FILTER_PURCHASE_RETURN:
      return {
        ...state,
        filtered: { ...state.filtered, purchaseReturn: null }
      };
    case GET_PURCHASE:
      return {
        ...state,
        purchases: action.payload
      };
    case ADD_PURCHASE_RETURN:
      return {
        ...state,
        purchaseReturn: action.payload.res,
        products: state.products.map(product => {
          if (product._id === action.payload.productId)
            return {
              ...product,
              numberInStock: product.numberInStock - action.payload.res.quantity
            };
          else return product;
        })
      };
    case GET_PURCHASE_USING_PRODUCTNAME:
      return {
        ...state,
        purchaseUsingProduct: action.payload
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case SAVE_NEW_PURCHASE:
      return {
        ...state,
        purchases: [action.payload.newPurchase, ...state.purchases],
        products: [action.payload.newProduct, ...state.products]
      };
    case SAVE_EXISTING_PURCHASE:
      return {
        ...state,
        purchases: [action.payload.res, ...state.purchases],
        products: state.products.map(product => {
          if (product._id === action.payload.productId) {
            return {
              ...product,
              numberInStock: product.numberInStock + action.payload.res.quantity
            };
          } else {
            return product;
          }
        })
      };
    case ADD_NEW_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case ADD_CREDITOR:
      return {
        ...state,
        creditors: [action.payload, ...state.creditors]
      };
    case DELETE_CREDITOR:
      return {
        ...state,
        creditors: state.creditors.filter(
          creditor => creditor._id !== action.payload
        )
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    case SAVE_NEW_PURCHASE_FAILED:
    case SAVE_EXISTING_PURCHASE_FAILED:
    case GET_CREDITORS_FAILED:
    case GET_CREDITOR_FAILED:
    case ADD_CREDITOR_FAILED:
    case EDIT_CREDITOR_FAILED:
    case DELETE_CREDITOR_FAILED:
    case GET_PURCHASE_FAILED:
    case GET_PRODUCTS_FAILED:
    case GET_PRODUCT_FAILED:
    case ADD_NEW_PRODUCT_FAILED:
    case EDIT_PRODUCT_FAILED:
    case DELETE_PRODUCT_FAILED:
    case GET_PURCHASE_USING_PRODUCTNAME_FAILED:
    case ADD_PURCHASE_RETURN_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
