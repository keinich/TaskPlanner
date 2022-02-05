import { combineReducers } from "redux";

import tasks from "./taskReducers";
import authReducers from "./authReducers";

export default combineReducers({
  tasks,
  authReducers
});
