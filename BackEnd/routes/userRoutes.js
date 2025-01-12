import express from "express";
import {
  checkExisting,
  loginUser,
  protectedRoute,
  registerUser,
} from "../controllers/userController.js";
import User from "../models/User.js";
import { getBookingHistory } from "../controllers/parkingLotController.js";
const userRoutes = express.Router();

userRoutes.post("/auth/register", checkExisting, registerUser);

userRoutes.post("/auth/login", loginUser);

userRoutes.get("/dashboard", protectedRoute, getBookingHistory);

export default userRoutes;
