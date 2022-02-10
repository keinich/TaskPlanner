const reducers = (projectLists = [], action) => {
  switch (action.type) {
    case "GET_PROJECT_LISTS":
      console.log("reducing GET_PROJECT_LISTS", action.payload);
      return action.payload;
    case "CREATE_PROJECT_LIST":
      return [...projectLists, action.payload];
    case "UPDATE_PROJECT_LIST":
      return projectLists.map((projList) =>
      projList.project_list_id === action.payload.project_list_id ? action.payload : projList
      );
    case "DELETE_PROJECT_LIST":
      return projectLists.filter((projList) => projList.project_list_id !== action.payload);
    default:
      return projectLists;
  }
};

export default reducers;
