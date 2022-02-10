import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { useDrop } from "react-dnd";

import {
  Paper,
  Grid,
  IconButton,
  Box,
  Button,
  isHostComponent,
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";

import { getTasks } from "../../actions/taskActions";
import Task from "../Task/Task";

import "./TaskList.css";
import { updateTask } from "../../actions/taskActions";

dayjs.extend(dayOfYear);

const TaskList = ({ day, mode }) => {
  const dispatch = useDispatch();
  const [dummy, setDummy] = useState(0);
  const [draggingTaskId, setDraggingTaskId] = useState(0);

  if (day === undefined || day === null) {
    day = dayjs();
  }
  if (mode === undefined) {
    mode = "lessequal";
  }
  // console.log("showing day", day.dayOfYear());
  const tasks = useSelector((state) =>
    state.tasks.filter(
      (task) =>
        (mode === "lessequal" &&
          (task.due_date === null ||
            dayjs(task.due_date).dayOfYear() <= day.dayOfYear())) ||
        (mode === "equal" &&
          task.due_date !== null &&
          dayjs(task.due_date).dayOfYear() === day.dayOfYear())
    )
  );
  const [showDone, setShowDone] = useState(true);

  const tasks1 = tasks.sort((x, y) => {
    if (x.priority < y.priority) {
      return -1;
    }
    if (x.priority > y.priority) {
      return 1;
    }
    // a muss gleich b sein
    return 0;
  });

  const onPrioChange = useCallback(
    (oldPrio, newPrio, taskId, dropped) => {
      if (dropped) {
        setDraggingTaskId(0);
        setDummy((p) => p + 1);
        // console.log("draggingTaskId", draggingTaskId);
        return;
      }
      // console.log("prio change");
      setDraggingTaskId((p) => taskId);
      if (oldPrio > newPrio) {
        let currentMinPrio = newPrio;
        tasks1.forEach((t) => {
          if (t.task_id !== taskId && t.priority === currentMinPrio) {
            t.priority += 1;
            currentMinPrio += 1;
          }
        });
      } else {
        let currentMaxPrio = newPrio;
        tasks1.forEach((t) => {
          if (t.task_id !== taskId && t.priority === currentMaxPrio) {
            t.priority -= 1;
            currentMaxPrio -= 1;
          }
        });
      }
      setDummy((p) => p + 1);
    },
    [tasks1]
  );

  const forceRender = useCallback(() => {
    setDummy((p) => p + 1);
    console.log("rendering", day);
  }, []);

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
      if (item.task.due_date !== day) {
        console.log(`changing duedate: ${item.task.due_date} to ${day}`);
        item.task.due_date = day;
        item.updateParent();
        item.updateParent = forceRender;
      }

      setDummy((p) => p + 1);
    },
    drop(item, monitor) {
      dispatch(updateTask(item.task.task_id, { ...item.task }));
    },
  });

  drop(ref);
  return (
    <>
      <Fragment>
        <Box container spacing={0} className="tasklist__grid" ref={ref}>
          {Object.keys(tasks1).map(
            (key) =>
              !tasks1[key].done && (
                <Task
                  opacity={tasks1[key].task_id === draggingTaskId ? 0.5 : 1}
                  task={tasks1[key]}
                  onPrioChange={onPrioChange}
                  renderTaskList={forceRender}
                  key={key}
                />
              )
          )}
          {showDone ? (
            <Button
              sx={{ marginTop: "20px" }}
              variant="text"
              startIcon={<ArrowDropDownOutlinedIcon />}
              onClick={() => setShowDone(false)}
            >
              {" "}
              Done
            </Button>
          ) : (
            <Button
              sx={{ marginTop: "20px" }}
              variant="text"
              startIcon={<ArrowRightOutlinedIcon />}
              onClick={() => setShowDone(true)}
            >
              {" "}
              Done
            </Button>
          )}

          {showDone &&
            Object.keys(tasks1).map(
              (key) => tasks1[key].done && <Task task={tasks1[key]} key={key} />
            )}
        </Box>
      </Fragment>
    </>
  );
};
export default TaskList;
