import { combineReducers } from "redux";

import taskReducers from "./taskReducers";
import authReducers from "./authReducers";

export default combineReducers({
  taskReducers,
  authReducers
});
