import axios from "axios";
import { getProfile } from "../services/authService";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchTasks = () => API.get("/tasks");
export const createTask = (newTask) =>
  API.post("/tasks", newTask, {
    headers: { Authorization: `token ${getProfile().token}` },
  });
export const updateTask = (taskId, updatedTask) =>
  API.patch(`/tasks/${taskId}`, updatedTask);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const signUpWithGoogle = (googleProfile) =>
  API.post("/users/signupgoogle", googleProfile);
