import {
  AppBar,
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import AddTodo from "../AddTask/AddTask";
import TaskList from "../TaskList/TaskList";

import "./MyDay.css";
import ProjectSelect from "../ProjectSelect/ProjectSelect";

const MyDay = () => {
  return (
    <Fragment>
      <Toolbar className="myday__header">
        <WbSunnyIcon sx={{ height: "100%"}}></WbSunnyIcon>
        <Typography variant="h6" noWrap component="div">
          My Day
        </Typography>
        <Typography sx={{flexGrow: 1}}></Typography>
        <ProjectSelect></ProjectSelect>
      </Toolbar>
      <div className="myday__canvas">
        <div className="myday__content">
          <div className="myday__list__wrapper">
            <div className="myday__list__content">
              <TaskList></TaskList>
              <AddTodo sx={{ width: "100vw" }}></AddTodo>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MyDay;
