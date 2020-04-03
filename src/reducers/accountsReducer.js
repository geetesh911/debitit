import {
  GET_CASH_DATA,
  GET_CASH_DATA_FAILED,
  GET_RANGE_CASH_DATA,
  GET_RANGE_CASH_DATA_FAILED,
  SET_ACCOUNTS_MSG,
  CLEAR_ACCOUNTS_MSG
} from "../actions/types";

const initialState = {
  cash: [],
  rangeCash: [],
  error: null,
  msg: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CASH_DATA:
      return {
        ...state,
        cash: action.payload
      };
    case GET_RANGE_CASH_DATA:
      return {
        ...state,
        rangeCash: action.payload
      };
    case SET_ACCOUNTS_MSG:
      return {
        ...state,
        msg: action.payload
      };
    case CLEAR_ACCOUNTS_MSG:
      return {
        ...state,
        msg: null
      };
    case GET_CASH_DATA_FAILED:
    case GET_RANGE_CASH_DATA_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
