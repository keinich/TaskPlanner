import { combineReducers } from "redux";

import tasks from "./taskReducers";
import authReducers from "./authReducers";
import projectReducers from "./projectReducers";
import projectListReducers from "./projectListReducers";

export default combineReducers({
  tasks,
  authReducers,
  projectReducers,
  projectListReducers
});
