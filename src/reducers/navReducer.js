import {
  ACCOUNTS_ACTIVE,
  SALES_ACTIVE,
  PURCHASE_ACTIVE,
  OTHERS_ACTIVE
} from "../actions/types";

const initialState = {
  accounts: false,
  sales: false,
  purchase: false,
  others: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACCOUNTS_ACTIVE:
      return {
        accounts: true,
        sales: false,
        purchase: false,
        others: false
      };
    case SALES_ACTIVE:
      return {
        accounts: false,
        sales: true,
        purchase: false,
        others: false
      };
    case PURCHASE_ACTIVE:
      return {
        accounts: false,
        sales: false,
        purchase: true,
        others: false
      };
    case OTHERS_ACTIVE:
      return {
        accounts: false,
        sales: false,
        purchase: false,
        others: true
      };
    default:
      return state;
  }
};
