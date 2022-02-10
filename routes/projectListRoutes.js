import express from "express";

import {
  getProjectLists,
  createProjectList,
} from "../controllers/projectListController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:project_id", auth, getProjectLists);
router.post("/", auth, createProjectList);

export default router;