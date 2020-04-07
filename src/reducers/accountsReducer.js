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
  CLEAR_ACCOUNTS_MSG
} from "../actions/types";

const initialState = {
  cash: [],
  bank: [],
  rangeCash: [],
  rangeBank: [],
  error: null,
  msg: null,
  dataNotFound: {
    rangeCashData: false,
    rangeBankData: false
  }
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
        rangeCash: action.payload.res,
        dataNotFound: {
          ...state.dataNotFound,
          rangeCashData: action.payload.dataNotFound
        }
      };
    case GET_BANK_DATA:
      return {
        ...state,
        bank: action.payload
      };
    case GET_RANGE_BANK_DATA:
      return {
        ...state,
        rangeBank: action.payload.res,
        dataNotFound: {
          ...state.dataNotFound,
          rangeBankData: action.payload.dataNotFound
        }
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
    case GET_BANK_DATA_FAILED:
    case GET_RANGE_BANK_DATA_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
