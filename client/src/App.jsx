import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider, Typography } from "@mui/material";
import darkTheme from "./themes";

import { Schedule, SideBar, Auth, TopBar } from "./components";
import { getTasks } from "./actions/taskActions";

import "./App.css";

const App = () => {
  // const [authToken, setAuthToken] = useState(false);

  const [profile, setProfile] = useState(localStorage.getItem("profile"));

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasks());
    setProfile(localStorage.getItem("profile"));   
  }, [dispatch, profile, location]);

  const authToken = profile !== undefined && profile !== null;

  console.log("authToken", authToken);

  return (
    <ThemeProvider theme={darkTheme}>      
      {profile ? (
        <Routes>
          <Route
            path="/"
            element={<SideBar contentElement={<Schedule />}></SideBar>}
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      ) : (
        <Auth />
      )}
    </ThemeProvider>
  );
};

export default App;
