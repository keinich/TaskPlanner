import React, { Fragment, useEffect, useState } from "react";

import EditTask from "./EditTask"

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

  // delete task function

  const deleteTask = async (id) => {
    try {
      const deleteTask = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task.task_id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const jsonData = await response.json();

      setTasks(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Fragment>      
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}
            <th scope="col">Description</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.task_id}>
              <td>{task.description}</td>
              <td>
                <EditTask task={task}></EditTask>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task.task_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTasks;
