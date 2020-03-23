import {
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED,
  ADD_CUSTOMER,
  ADD_CUSTOMER_FAILED,
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_FAILED,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAILED,
  ADD_SALES,
  ADD_SALES_FAILED
} from "../actions/types";

const initialState = {
  customers: [],
  customer: [],
  sales: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case GET_CUSTOMER:
      return {
        ...state,
        customer: action.payload
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [action.payload, ...state.customers]
      };
    case EDIT_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map(customer => {
          if (customer._id === action.payload._id) {
            return (customer = action.payload);
          } else {
            return customer;
          }
        }),
        customer:
          state.customer._id === action.payload._id
            ? action.payload
            : state.customer
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer._id !== action.payload
        )
      };
    case ADD_SALES:
      return {
        ...state,
        sales: [action.payload, ...state.sales]
        // products: action.products.map(product => {
        //   if (product._id === action.payload.productId) {
        //     return {
        //       ...product,
        //       numberInStock: product.numberInStock + action.payload.res.quantity
        //     };
        //   } else {
        //     return product;
        //   }
        // })
      };

    case GET_CUSTOMER_FAILED:
    case GET_CUSTOMERS_FAILED:
    case ADD_CUSTOMER_FAILED:
    case EDIT_CUSTOMER_FAILED:
    case DELETE_CUSTOMER_FAILED:
    case ADD_SALES_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
