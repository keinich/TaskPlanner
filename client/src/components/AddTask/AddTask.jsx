import { Input, Button, TextField, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../../actions/taskActions";

const AddTodo = () => {
  const [postData, setPostData] = useState({
    name: "",
    description: "",
    userId: 0,
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("creating task", postData);
    dispatch(createTask(postData));
  };

  return (
    <Paper
      className="myday__paper"
      position="sticky"
      sx={{ position: "sticky", top: 50, zIndex: 1100, width: "inherit" }}
    >
      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        {/* <TextField name="taskName" variant="outlined"/> */}
        <Input
          placeholder="New Task"
          style={{ width: "90%" }}
          value={postData.taskName}
          onChange={(e) => setPostData({ ...postData, name: e.target.value })}
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
