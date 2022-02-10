import { Paper, Grid, IconButton, Checkbox, Box } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import "./Task.css";
import UpdateTask from "../UpdateTask/UpdateTask";
import { useDispatch } from "react-redux";
import { deleteTask, getTasks, updateTask } from "../../actions/taskActions";

const Task = ({ task, onPrioChange, opacity, renderTaskList }) => {
  const [taskData, setTaskData] = React.useState({
    name: "",
    description: "",
    done: false,
    due_date: null,
    active: true,
    priority: 0,
  });
  const callOpenDrawer = React.createRef(null);

  const dispatch = useDispatch();

  React.useEffect(() => {
    setTaskData(task);
  }, [task]);

  const openDrawer = () => {
    callOpenDrawer.current();
    console.log("open drawer");
  };

  const handleDoneChanged = (e) => {
    setTaskData({ ...taskData, done: e.target.checked });
    dispatch(updateTask(task.task_id, { ...taskData, done: e.target.checked }));
  };

  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "task",
    collect(monitor) {
      // console.log("monitor", monitor.getHandlerId());
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.task.priority;
      const hoverIndex = task.priority;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      const draggingDown = dragIndex < hoverIndex;
      const draggingUp = dragIndex > hoverIndex;
      if (draggingDown && hoverClientY < hoverMiddleY) {
        return;
      }
      if (draggingUp && hoverClientY > hoverMiddleY) {
        return;
      }

      const oldPrio = item.task.priority;

      item.task.priority = task.priority;

      // task.priority += 1;
      item.task.drag = true;
      onPrioChange(oldPrio, item.task.priority, item.task.task_id, false);
      // dispatch(updateTask(item.task.task_id, { ...item.task, priority: task.priority }));
      // dispatch(getTasks());
    },
    drop(item, monitor) {
      dispatch(
        updateTask(item.task.task_id, { ...item.task, priority: task.priority })
      );
      onPrioChange(0, task.priority, item.task.task_id, true);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "task",
    item: () => {
      return { task: task, updateParent: renderTaskList };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end(item, monitor) {
      onPrioChange(0, 0, 0, true);
    }
  });

  // const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  // console.log("opacity", { task: task.name, opacity: opacity });
  return (
    <>
      <Grid
        xs={12}
        item
        ref={ref}
        data-handler-id={handlerId}
        sx={{ opacity: opacity }}
      >
        <Paper elevation={2} className="task__paper">
          <Checkbox
            checked={taskData.done}
            onChange={handleDoneChanged}
          ></Checkbox>
          <Box className="task__span__box" onClick={openDrawer}>
            <span className="task__span"> {task.name}</span>
          </Box>
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
