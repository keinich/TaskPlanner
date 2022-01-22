import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const siginin = (formData, navigate) => async (dispatch) => {
  try {
    // log in the user...

    navigate.push("/");
  } catch (error) {
    console.log("error in signin", error);
  }
}

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // sign up the user...

    navigate.push("/");
  } catch (error) {
    console.log("error in signin", error);
  }
}