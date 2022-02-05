import * as api from "../api";

// Action Creators
export const getTasks = () => async (dispatch) => {
  try {
    const { data } = await api.fetchTasks();
    const action = { type: "FETCH_ALL", payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    const { data } = await api.createTask(task);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (taskId, task) => async (dispatch) => {
  try {    
    const { data } = await api.updateTask(taskId, task);
    
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error);
  }
};
