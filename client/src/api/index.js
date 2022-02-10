import axios from "axios";
import { getProfile } from "../services/authService";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API = axios.create();

export const fetchTasks = () =>
  API.get("/tasks", {
    headers: { Authorization: `token ${getProfile().token}` },
  });
export const createTask = (newTask) =>
  API.post("/tasks", newTask, {
    headers: { Authorization: `token ${getProfile().token}` },
  });
export const updateTask = (taskId, updatedTask) =>
  API.patch(`/tasks/${taskId}`, updatedTask, {
    headers: { Authorization: `token ${getProfile().token}` },
  });
export const deleteTask = (taskId) =>
  API.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `token ${getProfile().token}` },
  });

export const getProjects = () =>
  API.get("/projects", {
    headers: { Authorization: `token ${getProfile().token}` },
  });
export const createProject = (newProject) =>
  API.post("/projects", newProject, {
    headers: { Authorization: `token ${getProfile().token}` },
  });

export const getProjectLists = (projectId) =>
  API.get(`/project-lists/${projectId}`, {
    headers: { Authorization: `token ${getProfile().token}` },
  });
export const createProjectList = (newProjectList) =>
  API.post("/project-lists", newProjectList, {
    headers: { Authorization: `token ${getProfile().token}` },
  });

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const signUpWithGoogle = (googleProfile) =>
  API.post("/users/signupgoogle", googleProfile);
