import { Paper, Grid, IconButton, Checkbox } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

import "./Task.css";
import UpdateTask from "../UpdateTask/UpdateTask";

const Task = ({ task }) => {
  const callOpenDrawer = React.createRef(null);

  const openDrawer = () => {
    callOpenDrawer.current();
  };

  return (
    <>
      <Grid xs={12} item>
        <Paper elevation={2} className="task__paper">
          <Checkbox></Checkbox>
          <span className="task__span">{task.name}</span>
          <IconButton
            color="primary"
            aria-label="Edit"
            className="task__icon"
            onClick={openDrawer}
          >
            <BuildIcon fontSize="small" />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="Delete"
            className="task__icon"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
      <UpdateTask openDrawerCaller={callOpenDrawer}></UpdateTask>
    </>
  );
};

export default Task;
