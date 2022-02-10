import { Grid, IconButton, Button, Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "../TaskList/TaskList";
import dayjs from "dayjs";

import "./Board.css";
import CreateProjectList from "../CreateProjectList/CreateProjectList";

const Board = ({ projectId }) => {
  const projectLists = useSelector((state) => state.projectListReducers);
  console.log("projectLists", projectLists);

  return (
    <Paper elevation={8} className="weeklytasks__outer">
      <div className="weeklytasks__inner">
        <Paper className="weeklytasks__dayline">
          {projectLists.map((item) => (
            <Paper
              className="weeklytasks__daycolumn"
              key={item.project_list_id}
            >
              <div>{item.project_list_name}</div>
            </Paper>
          ))}
          <CreateProjectList projectId={projectId}></CreateProjectList>
        </Paper>
        <div className="weeklytasks__days">
          {projectLists.map((item) => (
            <div className="weeklytasks__daycolumn" key={item.project_list_id}>
              {item.project_list_name}
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default Board;
