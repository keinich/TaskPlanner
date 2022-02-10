import * as api from "../api";

// Action Creators
export const getProjects = () => async (dispatch) => {
  try {
    const { data } = await api.getProjects();
    const action = { type: "GET_PROJECTS", payload: data };
    console.log("dispatching GET_PROJECTS", data);
    dispatch(action);
  } catch (error) {
    console.log("error when getting tasks", error);
  }
};

export const createProject = (project) => async (dispatch) => {
  try {
    const { data } = await api.createProject(project);

    dispatch({ type: "CREATE_PROJECT", payload: data });
  } catch (error) {
    console.log(error);
  }
};