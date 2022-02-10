import * as api from "../api";

// Action Creators
export const getProjectLists = (projectId) => async (dispatch) => {
  try {
    console.log("action getProjectLists", projectId);
    const { data } = await api.getProjectLists(projectId);
    const action = { type: "GET_PROJECT_LISTS", payload: data };
    console.log("dispatching GET_PROJECT_LISTS", data);
    dispatch(action);
  } catch (error) {
    console.log("error when GET_PROJECT_LISTS", error);
  }
};


export const createProjectList = (projectList) => async (dispatch) => {
  try {
    const { data } = await api.createProjectList(projectList);

    dispatch({ type: "CREATE_PROJECT_LIST", payload: data });
  } catch (error) {
    console.log(error);
  }
};