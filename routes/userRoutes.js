import express from "express";

import {
  signIn,
  signUp,
  signUpWithGoogle,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/signupgoogle", signUpWithGoogle);

export default router;
