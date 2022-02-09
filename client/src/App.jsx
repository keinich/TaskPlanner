import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider, Typography } from "@mui/material";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import LocalizationProvider from "@mui/lab/LocalizationProvider";
import darkTheme from "./themes";

import { SideBar, Auth } from "./components";
import { getTasks } from "./actions/taskActions";

import "./App.css";
import MyDay from "./components/MyDay/MyDay";
import Calendar from "./components/Calendar/Calendar";

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
    <LocalizationProvider dateAdapter={DateAdapter}>
      <ThemeProvider theme={darkTheme}>
        <DndProvider backend={HTML5Backend}>
          {profile ? (
            <Routes>
              <Route
                path="/"
                element={<SideBar contentElement={<MyDay />}></SideBar>}
              />
              <Route
                path="/myday"
                element={<SideBar contentElement={<MyDay />}></SideBar>}
              />
              <Route
                path="/calendar"
                element={<SideBar contentElement={<Calendar />}></SideBar>}
              />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          ) : (
            <Auth />
          )}
        </DndProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
