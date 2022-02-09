import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Button, Grid, IconButton, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../actions/taskActions";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

import "./UpdateTask.css";

const ariaLabel = { "aria-label": "description" };

export default function UpdateTask({ openDrawerCaller, taskId }) {
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  const [taskData, setTaskData] = React.useState({
    name: "",
    description: "",
    done: 0,
    due_date: null,
    priority: 0,
    active: true,
  });

  const task = useSelector((state) =>
    state.tasks.find((t) => t.task_id === taskId)
  );

  React.useEffect(() => {
    openDrawerCaller.current = openDrawer;
    if (task) setTaskData(task);
  }, [task, openDrawerCaller]);

  const openDrawer = () => {
    setState(true);
  };

  const toggleDrawer = (open) => (event) => {
    console.log("toggling drawer", event);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // setState(open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updating task", taskData);
    dispatch(updateTask(task.task_id, taskData));
    setState(false);
  };

  const list = () => (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onClick={toggleDrawer(true)}
      // onKeyDown={toggleDrawer(true)}
    >
      <Paper className="update__paper">
        <form
          autoComplete="off"
          noValidate
          className="my-form"
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ marginBottom: "20px" }}
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          ></TextField>
          <TextField
            sx={{ marginBottom: "20px" }}
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            multiline
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          >
            {task.name}
          </TextField>
          <DesktopDatePicker
            label="Date desktop"
            // inputFormat="MM/dd/yyyy"
            value={taskData.due_date}
            onChange={(e) => setTaskData({ ...taskData, due_date: e })}
            renderInput={(params) => (
              <TextField
                sx={{ marginBottom: "20px" }}
                className="updatetask__datepicker"
                {...params}
              />
            )}
          />
          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
            <IconButton
              color="primary"
              aria-label="Delete"
              className="task__icon"
              onClick={(e) => {
                e.preventDefault();
                setState(false);
                console.log("x click");
              }}
            >
              <CloseIcon color="primary" />
            </IconButton>
          </div>
        </form>
      </Paper>
    </Box>
  );

  return (
    <div>
      <React.Fragment key="right">
        <Drawer
          anchor="right"
          open={state}
          // open={anc}
          onClose={toggleDrawer(false)}
          sx={{ zIndex: 1260 }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
