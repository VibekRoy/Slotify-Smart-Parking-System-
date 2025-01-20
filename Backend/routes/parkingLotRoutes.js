import express from "express";
import {
  createLot,
  createSlot,
  viewLots,
  viewSlots,
} from "../controllers/parkingLotController.js";
import { verifyAdmin } from "../controllers/adminController.js";
import { protectedRoute } from "../controllers/userController.js";
import { getDistance } from "../controllers/mapController.js";
import {
  bookSlot,
  confirmBooking,
  extendSlot,
} from "../controllers/bookingControllers.js";

const slotRoutes = express.Router();

slotRoutes.get("/viewlots", viewLots);

slotRoutes.get("/:lotID/viewslots", viewSlots);

slotRoutes.post("/createlot", verifyAdmin, createLot);

slotRoutes.post("/createslot", verifyAdmin, createSlot);

slotRoutes.post("/bookslot", protectedRoute, bookSlot);

slotRoutes.post("/confirm", protectedRoute, confirmBooking);

slotRoutes.patch("/extendslot", protectedRoute, extendSlot);

slotRoutes.get("/distance", getDistance);

export default slotRoutes;
