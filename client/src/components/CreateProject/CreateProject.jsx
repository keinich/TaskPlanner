import { Input, Button, TextField, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../actions/projectActions";

import "./CreateProject.css";

const CreateProject = () => {
  
  
  const [projectData, setprojectData] = useState({
    project_name: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("creating project", projectData);
    dispatch(createProject(projectData));
  };


  return (
    <Paper elevation={16} className="createproject__paper">
      <form style={{ display: "flex", width: "100%", height: "100%" }} onSubmit={handleSubmit}>
        {/* <TextField name="taskName" variant="outlined"/> */}
        <Input
          placeholder="Create Project"
          style={{ width: "90%" }}
          value={projectData.project_name}
          onChange={(e) => setprojectData({ ...projectData, project_name: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
        >
          +
        </Button>
      </form>
    </Paper>
  );
};

export default CreateProject;
