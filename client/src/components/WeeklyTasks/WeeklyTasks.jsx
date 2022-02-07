import { Grid, Paper } from "@mui/material";
import React from "react";

import "./WeeklyTasks.css";

const WeeklyTasks = () => {
  return (
    <Paper elevation="8" className="weeklytasks__outer">
      <div className="weeklytasks__inner">
        <div className="weeklytasks__dayline">
          {["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"].map((key) => (
            <div className="weeklytasks__daycolumn">
              <div>{key}</div>
            </div>
          ))}
        </div>
        {/* <Grid container spacing={2}>
          <Grid item xs={2} className="weeklytasks__daycolumn">
            <div>Mon</div>
          </Grid>
          <Grid item xs={2} className="weeklytasks__daycolumn">
            <div>Mon</div>
          </Grid>
          <Grid item xs={2} className="weeklytasks__daycolumn">
            <div>Mon</div>
          </Grid>
          <Grid item xs={2} className="weeklytasks__daycolumn">
            <div>Mon</div>
          </Grid>
          <Grid item xs={2} className="weeklytasks__daycolumn">
            <div>Mon</div>
          </Grid>
          <Grid item xs={2} className="weeklytasks__daycolumn">
            <div>Mon</div>
          </Grid>
          <Grid item xs={2} className="weeklytasks__daycolumn">
            <div>Mon</div>
          </Grid>
        </Grid> */}
      </div>
    </Paper>
  );
};

export default WeeklyTasks;
