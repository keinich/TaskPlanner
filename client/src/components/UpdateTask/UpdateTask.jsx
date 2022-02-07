import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { Button, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../actions/taskActions";

import "./UpdateTask.css";

const ariaLabel = { "aria-label": "description" };

export default function UpdateTask({ openDrawerCaller, taskId }) {
  const [state, setState] = React.useState(false);
  const dispatch = useDispatch();
  const [taskData, setTaskData] = React.useState({ name: "", description: "" });

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
    console.log("toggling drawer", open);
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("updating task", taskData);
    dispatch(updateTask(task.task_id, taskData));
  };

  const list = () => (
    <Box
      sx={{ width: '100%' }}
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
            sx={{marginBottom:"20px"}}
            name="name"
            variant="outlined"
            label="Name"
            fullWidth
            value={taskData.name}
            onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
          ></TextField>
          <TextField
            sx={{marginBottom:"20px"}}
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
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
          sx={{zIndex: 1260}}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
