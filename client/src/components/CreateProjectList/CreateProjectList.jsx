import { Input, Button, TextField, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProjectList } from "../../actions/projectListActions";

import "./CreateProjectList.css";

const CreateProjectList = ({ projectId }) => {
  const [projectListData, setprojectListData] = useState({
    project_list_name: "",
    project_id: projectId,
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("creating project list", projectListData);
    dispatch(createProjectList(projectListData));
  };

  return (
    <Paper elevation={16} className="createproject__paper">
      <form
        style={{ display: "flex", width: "100%", height: "100%" }}
        onSubmit={handleSubmit}
      >
        {/* <TextField name="taskName" variant="outlined"/> */}
        <Input
          placeholder="Create List"
          style={{ width: "90%" }}
          value={projectListData.project_list_name}
          onChange={(e) =>
            setprojectListData({
              ...projectListData,
              project_id: projectId,
              project_list_name: e.target.value,
            })
          }
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ width: "10%" }}
        >
          {projectId}
        </Button>
      </form>
    </Paper>
  );
};

export default CreateProjectList;
