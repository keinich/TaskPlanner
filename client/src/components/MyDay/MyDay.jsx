import { Button, Grid, Paper } from "@mui/material";
import React, { Fragment } from "react";
import AddTodo from "../AddTask/AddTask";
import TaskList from "../TaskList/TaskList";
import UpdateTask from "../UpdateTask/UpdateTask";

import "./MyDay.css";

const MyDay = () => {

  const callOpenDrawer = React.createRef(null);

  const openDrawer = () => {
    callOpenDrawer.current();
  }

  return (
    <Fragment>
      <Button onClick={openDrawer}>Test</Button>
      <UpdateTask openDrawerCaller={callOpenDrawer}></UpdateTask>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TaskList />
        </Grid>
        <Grid item xs={12}>
          <Paper className="myday__paper">
            <AddTodo></AddTodo>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MyDay;
