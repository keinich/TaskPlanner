import { Grid, IconButton, Button, Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TaskList from "../TaskList/TaskList";
import dayjs from "dayjs";

import "./WeeklyTasks.css";
import AddTodo from "../AddTask/AddTask";

const WeeklyTasks = ({ weekOffset }) => {
  const [days, setDays] = React.useState([]);

  useEffect(() => {
    let day = dayjs();
    if (weekOffset > 0) {
      day = day.add(weekOffset, "week");
    }
    if (weekOffset < 0) {
      day = day.subtract(-weekOffset, "week");
    }
    console.log("week offset", weekOffset);
    setDays([
      { token: "Sun", date: day.day(0) },
      { token: "Mon", date: day.day(1) },
      { token: "Tue", date: day.day(2) },
      { token: "Wen", date: day.day(3) },
      { token: "Thu", date: day.day(4) },
      { token: "Fri", date: day.day(5) },
      { token: "Sat", date: day.day(6) },
    ]);
    console.log("showing days", day.day());
  }, [weekOffset]);

  return (
    <Paper elevation={8} className="weeklytasks__outer">
      <div className="weeklytasks__inner">
        <Paper className="weeklytasks__dayline">
          {days.map((item) => (
            <Paper className="weeklytasks__daycolumn" key={item.token}>
              <div>{item.token}</div>
              <div>
                {item.date.date()}/{item.date.month() + 1}/{item.date.year()}
              </div>
            </Paper>
          ))}
        </Paper>
        <div className="weeklytasks__days">
          {days.map((item) => (
            <div className="weeklytasks__daycolumn" key={item.token}>
              <TaskList day={item.date} mode="calendar"></TaskList>
              <AddTodo dueDate={item.date}></AddTodo>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
};

export default WeeklyTasks;
