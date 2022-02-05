import express from "express";

import { getTasks, createTask, updateTask } from "../controllers/taskController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", auth, createTask);
router.patch("/:id", updateTask)

export default router;
