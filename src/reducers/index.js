import { combineReducers } from "redux";
import authReducer from "./authReducer";
import purchaseReducer from "./purchaseReducer";
import alertReducer from "./alertReducer";

export default combineReducers({
  auth: authReducer,
  purchase: purchaseReducer,
  alert: alertReducer
});
