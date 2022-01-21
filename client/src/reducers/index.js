import { combineReducers } from "redux";

import taskReducers from "./taskReducers";
import authReducers from "./auth";

export default combineReducers({
  taskReducers,
  authReducers
});
