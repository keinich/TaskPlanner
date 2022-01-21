import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider, Typography } from "@mui/material";
import darkTheme from "./themes";

import { Schedule, SideBar, Auth, TopBar } from "./components";
import { getTasks } from "./actions/taskActions";

import "./App.css";

const App = () => {
  // const [authToken, setAuthToken] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const profile = localStorage.getItem("profile");
  const authToken = profile !== undefined && profile !== null;

  console.log("authToken", authToken);

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <SideBar
          contentElement={
            <Routes>
              <Route path="/" element={<Schedule />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          }
        ></SideBar>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
