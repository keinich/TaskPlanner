import { Input, Button, TextField, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../actions/taskActions";

import "./AddTask.css";

const AddTodo = ({dueDate}) => {
  
  if (dueDate === undefined) {
    dueDate = new Date();
  }
  console.log("dueDate", dueDate);

  const [taskData, setTaskData] = useState({
    name: "",
    description: "",
    due_date: dueDate,
    userId: 0,
    priority: 0,
    active: true
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("creating task", taskData);
    dispatch(createTask(taskData));
  };


  return (
    <Paper elevation={16} className="addtask__paper">
      <form style={{ display: "flex", width: "100%" }} onSubmit={handleSubmit}>
        {/* <TextField name="taskName" variant="outlined"/> */}
        <Input
          placeholder="New Task"
          style={{ width: "90%" }}
          value={taskData.taskName}
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
        >
          Add
        </Button>
      </form>
    </Paper>
  );
};

export default AddTodo;
