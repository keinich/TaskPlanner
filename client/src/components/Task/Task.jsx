import { Paper, Grid, IconButton, Checkbox } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

import "./Task.css";
import UpdateTask from "../UpdateTask/UpdateTask";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../actions/taskActions";

const Task = ({ task }) => {
  const [taskData, setTaskData] = React.useState({
    name: "",
    description: "",
    done: false,
    due_date: null,
  });
  const callOpenDrawer = React.createRef(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setTaskData(task);
  }, [task]);

  const openDrawer = () => {
    callOpenDrawer.current();
    console.log("open drawer")
  };

  const handleDoneChanged = (e) => {
    setTaskData({ ...taskData, done: e.target.checked });
    dispatch(updateTask(task.task_id, { ...taskData, done: e.target.checked }));
  };

  return (
    <>
      <Grid xs={12} item>
        <Paper elevation={2} className="task__paper" onClick={openDrawer}>
          <Checkbox
            checked={taskData.done}
            onChange={handleDoneChanged}
          ></Checkbox>
          <span className="task__span">{task.name}</span>
          <IconButton
            color="primary"
            aria-label="Delete"
            className="task__icon"
            onClick={() => dispatch(deleteTask(task.task_id))}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Paper>
      </Grid>
      <UpdateTask
        openDrawerCaller={callOpenDrawer}
        taskId={task.task_id}
      ></UpdateTask>
    </>
  );
};

export default Task;
