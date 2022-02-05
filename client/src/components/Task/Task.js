import { Paper, Grid, IconButton, Checkbox } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react";

import "./Task.css";

const Task = ({ task }) => {
  return (
    <Grid xs={12} item>
      <Paper elevation={2} className="task__paper">
        <Checkbox></Checkbox>
        <span className="task__span">{task.name} asd</span>        
        <IconButton color="primary" aria-label="Edit" className="task__icon">
          <BuildIcon fontSize="small"/>
        </IconButton>    
        <IconButton color="primary" aria-label="Delete" className="task__icon">
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default Task;
