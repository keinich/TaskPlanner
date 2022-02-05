import { AppBar, Button, Grid, Paper } from "@mui/material";
import React, { Fragment } from "react";
import AddTodo from "../AddTask/AddTask";
import TaskList from "../TaskList/TaskList";

import "./MyDay.css";

const MyDay = () => {
  return (
    <Fragment>
      <Grid container spacing={0} sx={{ height: "80vh" }}>
        {/* <Grid item xs={12}> */}
        {/* </Grid> */}
        <Grid item xs={12} sx={{ padding: "24px" }}>
          <TaskList />
        </Grid>
        <AddTodo sx={{ width: "100vw" }}></AddTodo>
      </Grid>
    </Fragment>
  );
};

export default MyDay;
