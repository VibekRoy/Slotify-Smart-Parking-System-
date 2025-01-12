import express from "express";
import {
  bookSlot,
  createLot,
  createSlot,
  extendSlot,
  viewLots,
  viewSlots,
} from "../controllers/parkingLotController.js";
import { verifyAdmin } from "../controllers/adminController.js";
import { protectedRoute } from "../controllers/userController.js";

const slotRoutes = express.Router();

slotRoutes.get("/viewlots", viewLots);

slotRoutes.get("/:lotID/viewslots", viewSlots);

slotRoutes.post("/createlot", verifyAdmin, createLot);

slotRoutes.post("/createslot", verifyAdmin, createSlot);

slotRoutes.post("/bookslot", protectedRoute, bookSlot);

slotRoutes.patch("/extendslot", protectedRoute, extendSlot);

export default slotRoutes;
