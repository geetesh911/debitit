import { combineReducers } from "redux";
import authReducer from "./authReducer";
import transactionReducer from "./transactionReducer";
import alertReducer from "./alertReducer";
import othersReducer from "./othersReducer";
import navReducer from "./navReducer";
import accountsReducer from "./accountsReducer";

export default combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  alert: alertReducer,
  others: othersReducer,
  nav: navReducer,
  accounts: accountsReducer
});
