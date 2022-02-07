import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";

import { Paper, Grid, IconButton, Box, Button } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

import { getTasks } from "../../actions/taskActions";
import Task from "../Task/Task";

import "./TaskList.css";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [showDone, setShowDone] = useState(true);

  return (
    <>
      <Fragment>
        <Box container spacing={0} className="tasklist__grid">
          {Object.keys(tasks).map(
            (key) => !tasks[key].done && <Task task={tasks[key]} key={key} />
          )}
          {showDone ? (
            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              startIcon={<ArrowDropDownOutlinedIcon />}
              onClick = {() => setShowDone(false)}
            >
              {" "}
              Done
            </Button>
          ) : (
            <Button
              sx={{ marginTop: "20px" }}
              variant="contained"
              startIcon={<ArrowRightOutlinedIcon />}
              onClick = {() => setShowDone(true)}
            >
              {" "}
              Done
            </Button>
          )}

          {showDone && Object.keys(tasks).map(
            (key) => tasks[key].done && <Task task={tasks[key]} key={key} />
          )}
        </Box>
      </Fragment>
    </>
  );
};
export default TaskList;
