import express from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controller/userController.js";
import { authUser } from "../middleware/auth.js";

export const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authUser, userProfile);
