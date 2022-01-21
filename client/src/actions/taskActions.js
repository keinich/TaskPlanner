import * as api from '../api';

// Action Creators
export const getTasks = () => async (dispatch) => {

  try {
    const { data } = await api.fetchTasks();
    const action = { type: 'FETCH_ALL', payload: data}
    dispatch(action);
  } catch (error) {
    console.log(error);
  }

}
