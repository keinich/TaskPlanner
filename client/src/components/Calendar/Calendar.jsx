import { Button, Paper } from "@mui/material";
import React from "react";
import WeeklyTasks from "../WeeklyTasks/WeeklyTasks";

import "./Calendar.css";

const Calendar = () => {
  return (
    <div className="calendar__canvas">
      <div className="calendar__content">
        <div className="calendar__main__content">
          <div className="calendar__inner__canvas">
            <div className="timeline__outer">
              <div className="timeline__inner">
                <div className="calendar__toolbar__wrapper">
                  <div className="calendar__toolbar">
                    <Button>Test</Button>
                    <div className="calendar__inner__toolbar">
                      <Button>Left</Button>
                      <Button>Today</Button>
                      <Button>Right</Button>
                    </div>
                  </div>
                </div>
                <WeeklyTasks></WeeklyTasks>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
