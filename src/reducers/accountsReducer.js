import { GET_CASH_DATA, GET_CASH_DATA_FAILED } from "../actions/types";

const initialState = {
  cash: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CASH_DATA:
      return {
        ...state,
        cash: action.payload
      };
    case GET_CASH_DATA_FAILED:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
