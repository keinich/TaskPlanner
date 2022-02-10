import express from "express";

import {
  createProject,
  getProjects,
} from "../controllers/projectController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getProjects);
router.post("/", auth, createProject);

export default router;