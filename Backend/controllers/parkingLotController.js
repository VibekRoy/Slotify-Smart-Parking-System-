import mongoose from "mongoose";
import { Slot, Lot } from "../models/ParkingSlot.js";

export const createLot = async (req, res) => {
  const { lots } = req.body;

  if (!lots || !Array.isArray(lots)) {
    return res
      .status(400)
      .json({ message: "Invalid data, lots should be an array" });
  }
  const insertedLots = await Lot.insertMany(lots)
    .then(() => {
      res.status(201).json({ message: "Lots created successfully" });
    })

    .catch((e) => res.json({ error: e }));
};

export const createSlot = async (req, res) => {
  const { lotId, slotIds } = req.body;
  if (!slotIds || !lotId) {
    return res
      .status(400)
      .json({ message: "Slot IDs and Lot ID are required" });
  }
  try {
    const lot = await Lot.findById(lotId);
    if (!lot) {
      return res.status(404).json({ message: "Lot not found" });
    }

    await Slot.insertMany(slotIds)
      .then(() => {
        res.status(201).json({ message: "Slots created successfully" });
      })
      .catch((e) => res.status(400).json({ Error: e }));
  } catch (error) {
    console.error("Error creating slot:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const viewLots = async (req, res) => {
  const lots = await Lot.find();
  res.json({ lots }).status(200);
};

export const viewSlots = async (req, res) => {
  const { lotID } = req.params;
  const slots = await Slot.find({ lotId: lotID });
  res.json({ slots }).status(200);
};
