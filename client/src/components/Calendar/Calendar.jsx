import { Button, TextField, IconButton } from "@mui/material";
import React from "react";
import WeeklyTasks from "../WeeklyTasks/WeeklyTasks";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import ArrowForwardIconIos from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIconIos from "@mui/icons-material/ArrowBackIos";

import "./Calendar.css";

const Calendar = () => {
  const [offset, setOffset] = React.useState(0);
  const [referenceDay, setReferenceDay] = React.useState(new Date());

  return (
    <div className="calendar__canvas">
      <div className="calendar__content">
        <div className="calendar__main__content">
          <div className="calendar__inner__canvas">
            <div className="timeline__outer">
              <div className="timeline__inner">
                <div className="calendar__toolbar__wrapper">
                  <div className="calendar__toolbar">
                    {/* <DesktopDatePicker
                      label="Day"
                      // inputFormat="MM/dd/yyyy"
                      value={referenceDay}
                      onChange={(e) => setReferenceDay(e)}
                      renderInput={(params) => <TextField {...params} />}
                    /> */}
                    {/* <div className="calendar__inner__toolbar"> */}
                    <IconButton aria-label="delete" onClick={() => setOffset(offset - 1)}>
                      <ArrowBackIconIos />
                    </IconButton>
                    <Button onClick={() => setOffset(0)}>Today</Button>
                    <IconButton aria-label="delete"  onClick={() => setOffset(offset + 1)}>
                      <ArrowForwardIconIos />
                    </IconButton>
                    {/* </div> */}
                  </div>
                </div>
                <WeeklyTasks weekOffset={offset}></WeeklyTasks>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
