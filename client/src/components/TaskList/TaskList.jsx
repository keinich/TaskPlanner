import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import { Paper, Grid, IconButton, Box } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";

import { getTasks } from "../../actions/taskActions";
import Task from "../Task/Task";

import "./TaskList.css";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <>
      <Fragment>
        <Box container spacing={0} className="tasklist__grid">
          {/* <Grid item xs={12}> */}
          {Object.keys(tasks).map((key) => (
            <Task task={tasks[key]} key={key} />
          ))}
          {/* </Grid> */}
        </Box>
      </Fragment>
    </>
  );
};
export default TaskList;
