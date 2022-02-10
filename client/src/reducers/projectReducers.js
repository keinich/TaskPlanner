const reducers = (projects = [], action) => {
  switch (action.type) {
    case "GET_PROJECTS":
      console.log("reducing GET_PROJECTS", projects);
      return action.payload;
    case "CREATE_PROJECT":
      return [...projects, action.payload];
    case "UPDATE_PROJECT":
      return projects.map((proj) =>
        proj.project_id === action.payload.project_id ? action.payload : proj
      );
    case "DELETE_PROJECT":
      return projects.filter((proj) => proj.project_id !== action.payload);
    default:
      return projects;
  }
};

export default reducers;
