import { AppBar, Button, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import AddTodo from "../AddTask/AddTask";
import TaskList from "../TaskList/TaskList";

import "./MyDay.css";

const MyDay = () => {
  return (
    <Fragment>
      <div className="myday__canvas">
        <div className="myday__content">
          <div className="myday__list__wrapper">
            <div className="myday__list__content">
              <Paper className="myday__header">MY DAY HEADER</Paper>
              <TaskList></TaskList>
              <AddTodo sx={{ width: "100vw" }}></AddTodo>
            </div>
          </div>
        </div>
      </div>
      {/* <Grid container spacing={0} sx={{ height: "80vh" }}>
        <Grid item xs={12} sx={{ padding: "24px" }}>
          <TaskList />
        </Grid>
      </Grid> */}
    </Fragment>
  );
};

export default MyDay;
