import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const siginin = (formData, navigate) => async (dispatch) => {
  try {
    
    const { data } = await api.signIn(formData);
    dispatch({type: AUTH, data});
    navigate("/");
  } catch (error) {
    console.log("error in signin", error);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    
    const { data } = await api.signUp(formData);
    dispatch({type: AUTH, data});

    navigate("/");
  } catch (error) {
    console.log("error in signin", error);
  }
}

export const signupWithGoogle = (googleRes, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUpWithGoogle(googleRes);

    dispatch({type: AUTH, data});

    console.log("navigation after google", navigate);
    navigate("/");
  } catch (error) {
    console.log("error in signin", error);
  }
}