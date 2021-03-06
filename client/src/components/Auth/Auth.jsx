import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Box,
  CssBaseline,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import IceSkatingIcon from "@mui/icons-material/IceSkating";

import Input from "./Input";
import { siginin, signup, signupWithGoogle } from "../../actions/authActions";

import "./Auth.css";

const initalState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initalState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(siginin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const profileObject = res?.profileObj;
    const tokenId = res?.tokenId;

    try {
      dispatch(signupWithGoogle(res, navigate));
      // dispatch({ type: "AUTH", data: { profileObject, tokenId } });

      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log("Google Sign In was unsuccessful.", error);
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, backgroundColor: "primary" }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs" className="my-container">
        <Paper className="my-paper" elevation={3}>
          <Avatar className="my-avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          <form onSubmit={handleSubmit} className="my-form">
            <Grid container spacing={2} className="my-grid">
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    autoFocus={true}
                    half={true}
                    type={"text"}
                  ></Input>
                  <Input
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    half={true}
                    type={"text"}
                  ></Input>
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                onChange={handleChange}
                type="email"
              ></Input>
              <Input
                name="password"
                label="Password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              ></Input>
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  onChange={handleChange}
                  type="password"
                ></Input>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="my-submit"
                >
                  {isSignup ? "Sign Up" : "Sign In"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <GoogleLogin
                  clientId="776141787389-slbklddahaamvhb3qbbkgidke0uq342u.apps.googleusercontent.com"
                  render={(renderProprs) => (
                    <Button
                      className="my-google-button"
                      color="primary"
                      fullWidth
                      onClick={renderProprs.onClick}
                      disabled={renderProprs.disabled}
                      startIcon={<IceSkatingIcon />}
                      variant="contained"
                    >
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                    {isSignup
                      ? "Already have a account? Sign In"
                      : "Don't have a account? Sign Up"}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Auth;
