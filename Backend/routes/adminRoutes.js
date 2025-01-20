import express from "express";
import { adminLogin, verifyAdmin } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/dashboard", verifyAdmin, (req, res) => {
  res.send(`Welcome to Admin Dashboard ${req.body.username}`);
});

export default adminRouter;
