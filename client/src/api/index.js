import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchTasks = () => API.get("/tasks");

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const signUpWithGoogle = (googleProfile) =>
  API.post("/users/signupgoogle", googleProfile);
