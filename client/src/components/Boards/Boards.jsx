import { Button, TextField, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import WeeklyTasks from "../WeeklyTasks/WeeklyTasks";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import "./Boards.css";
import { useDispatch, useSelector } from "react-redux";
import CreateProject from "../CreateProject/CreateProject";
import Board from "../Board/Board";
import { getProjectLists } from "../../actions/projectListActions";

const Boards = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projectReducers);
  const [projectId, setProjectId] = React.useState(
    projects.length > 0 ? projects[0].project_id : 0
  );

  const handleProjectChange = (e) => {
    console.log("project change", e.target);
    setProjectId(e.target.value);
    dispatch(getProjectLists(e.target.value));
  };

  useEffect(() => {
    // dispatch(getProjectLists(projectId));
  }, [dispatch, projectId]);

  return (
    <div className="calendar__canvas">
      <div className="calendar__content">
        <div className="calendar__main__content">
          <div className="calendar__inner__canvas">
            <div className="timeline__outer">
              <div className="timeline__inner">
                <div className="calendar__toolbar__wrapper">
                  <div className="calendar__toolbar">
                    <Select
                      labelId="project-slect-label"
                      id="project-select"
                      value={projects.length > 0 ? projectId : ""}
                      label="project_name"
                      onChange={handleProjectChange}
                    >
                      {projects.map((proj) => (
                        <MenuItem value={proj.project_id} key={proj.project_id}>
                          {proj.project_name}
                        </MenuItem>
                      ))}
                    </Select>
                    <CreateProject></CreateProject>
                  </div>
                </div>
                <Board projectId={projectId}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boards;
