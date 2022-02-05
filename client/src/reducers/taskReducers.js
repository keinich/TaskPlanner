const reducers = (tasks = [], action) => {
  switch (action.type) {
    case 'FETCH_ALL':
      return action.payload;
    case 'CREATE':
      return [...tasks, action.payload];
    case 'UPDATE':
      return tasks.map((task) => task.task_id === action.payload.task_id ? action.payload : task);
    default:
      return tasks;
  }
};

export default reducers;
