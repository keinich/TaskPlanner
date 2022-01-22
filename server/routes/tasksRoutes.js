import express from "express";

import { getTasks, createTask } from "../controllers/taskController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", auth, createTask);

export default router;
