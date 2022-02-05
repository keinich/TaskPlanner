import { Input, Button, TextField } from "@mui/material";
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

    dispatch(createTask(postData));
  };

  return (
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
  );
};

export default AddTodo;
