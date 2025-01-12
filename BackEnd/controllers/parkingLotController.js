import mongoose from "mongoose";
import { Slot, Lot } from "../models/ParkingSlot.js";
import { BookingHistory } from "../models/User.js";

export const createLot = (req, res) => {
  const { lotID, name, latitude, longitude } = req.body;

  const newLot = new Lot({
    lotId: lotID,
    name: name,
    location: {
      type: "Point",
      coordinates: [latitude, longitude],
    },
  });

  newLot
    .save()
    .then(() =>
      res
        .json({
          message: `Lot Created Successfully with LotID: ${lotID}`,
          _id: newLot._id,
        })
        .status(200)
    )
    .catch((e) => res.json({ error: e }));
};

export const createSlot = async (req, res) => {
  const { lotID, slotID } = req.body;

  try {
    const lot = await Lot.findById(lotID);
    if (!lot) {
      return res
        .status(404)
        .json({ message: `Lot with ID ${lotID} not found.` });
    }

    const newSlot = new Slot({
      slotId: slotID,
      lotId: lotID,
    });

    await newSlot.save();
    res
      .status(201)
      .json({ message: `Slot ${slotID} created for Lot ${lotID}.` });
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
  await cleanupExpiredSlotsOnDemand();
  const slots = await Slot.find({ lotId: lotID });
  res.json({ slots }).status(200);
};

export const bookSlot = async (req, res) => {
  const { lotID, slotID, userID, bST, bET } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the slot that is available (status: false means it's available)
    const slot = await Slot.findOne(
      { lotId: lotID, slotId: slotID, status: false },
      null,
      { session }
    );
    console.log("reached till here");

    if (!slot) {
      // If no slot is found or the slot is already booked
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Update the slot to be booked

    const updatedSlot = await Slot.findOneAndUpdate(
      { slotId: slotID, status: false },
      {
        status: true, // Mark the slot as booked
        bookedBy: userID,
        bST: new Date(bST), // Make sure to handle date format conversion in frontend
        bET: new Date(bET), // Same for bET
      },

      { new: true, session }
    );

    if (!updatedSlot) {
      // If for some reason the update fails
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Slot could not be booked" });
    }

    const bookingHistory = new BookingHistory({
      userId: userID,
      lotId: lotID,
      slotId: slot._id,
      bST,
      bET,
    });
    await bookingHistory.save({ session });

    // Commit the transaction after successful booking
    await session.commitTransaction();
    await session.endSession();
    res.status(200).json({ message: "Slot booked successfully" });
  } catch (error) {
    // If an error occurs, abort the transaction and end the session
    await session.abortTransaction();
    await session.endSession();
    res
      .status(500)
      .json({ message: "Error booking slot", error: error.message });
  }
};

export const extendSlot = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { lotId, slotId, userId, newEndTime } = req.body;

    if (new Date(newEndTime) <= new Date()) {
      return res
        .status(400)
        .json({ message: "New end time must be in the future." });
    }

    const slot = await Slot.findOne(
      { lotId: lotId, slotId, status: true, bookedBy: userId },
      null,
      { session }
    );

    if (!slot) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: "Slot not found or not booked by this user." });
    }

    const updatedSlot = await Slot.findOneAndUpdate(
      { lotId, slotId, status: true, bookedBy: userId },
      { $set: { bET: new Date(newEndTime) } },
      { new: true, session }
    );

    if (!updatedSlot) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(500)
        .json({ message: "Failed to extend the slot booking time." });
    }

    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({
      message: "Slot booking time extended successfully.",
      updatedSlot,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error extending slot:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getBookingHistory = async (req, res) => {
  const { userId } = req.user;
  
  try {
    const history = await BookingHistory.find({ userId: userId })
      .populate("lotId", "name location")
      .populate("slotId", "slotId")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Booking history fetched", history });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching history", error: error.message });
  }
};

const cleanupExpiredSlotsOnDemand = async () => {
  const now = new Date();

  await Slot.updateMany(
    { status: true, bET: { $lt: now } },
    {
      $set: {
        status: false,
        bookedBy: null,
        bST: null,
        bET: null,
      },
    }
  );
};
