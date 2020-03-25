import { combineReducers } from "redux";
import authReducer from "./authReducer";
import transactionReducer from "./transactionReducer";
import alertReducer from "./alertReducer";
import othersReducer from "./othersReducer";

export default combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
  alert: alertReducer,
  others: othersReducer
});
