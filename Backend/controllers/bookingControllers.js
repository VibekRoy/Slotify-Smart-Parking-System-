import { BookingHistory } from "../models/User.js";
import { Slot } from "../models/ParkingSlot.js";
import { redis } from "../config/db.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
let bookingDetails;

const isTimeOverlapping = (history, newBST, newBET) => {
  return history.some(({ bST, bET }) => {
    const existingBST = new Date(bST).getTime();
    const existingBET = new Date(bET).getTime();
    const newStartTime = new Date(newBST).getTime();
    const newEndTime = new Date(newBET).getTime();

    return (
      (newStartTime < existingBET && newEndTime > existingBST) ||
      newStartTime === existingBST ||
      newEndTime === existingBET
    );
  });
};

export const bookSlot = async (req, res) => {
  const {
    lotName,
    slotIdandType,
    pST,
    pET,
    userId,
    slotId,
    lotId,
    vehicle,
    vehicleNumber,
    contact,
    bST,
    bET,
    duration,
    amount,
  } = req.body;

  const redisLockKey = `lock:slot:${slotId}`;

  try {
    // Step 1: Acquire Redis Lock
    const lock = await redis.set(redisLockKey, "locked", "NX", "EX", 30);
    if (!lock) {
      return res.status(400).json({
        message: "Slot is being booked by another user. Try again later.",
      });
    }

    // Step 2: Check Slot Availability
    const slot = await Slot.findById(slotId);
    if (!slot) {
      throw new Error("Slot not found.");
    }
    if (isTimeOverlapping(slot.history, bST, bET)) {
      throw new Error("Slot is already booked for the selected time.");
    }

    // Step 3: Process Payment with Stripe
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card", "amazon_pay", "paypal"],
        mode: "payment",
        success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CANCEL_URL}`,
        line_items: [
          {
            price_data: {
              currency: "inr",
              unit_amount: amount * 100,
              product_data: {
                name: `${lotName} - ${slotIdandType}`,
                description: `Vehicle: ${vehicle} - ${vehicleNumber}\nEntry Time: ${pST}\nExit Time: ${pET} \nDuration: ${duration} hours\nContact: ${contact}`,
              },
            },
            quantity: 1,
          },
        ],
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      console.log(error);
      await redis.del(redisLockKey);
      return res
        .status(500)
        .json({ message: "Payment Session creation failed" });
    }

    bookingDetails = {
      userId,
      lotId,
      slotId,
      vehicle,
      vehicleNumber,
      contact,
      bST,
      bET,
      amount,
      pST,
      pET,
    };

    res.status(200).json({ sessionId });
  } catch (error) {
    // Release Redis Lock in case of errors
    await redis.del(redisLockKey);
    res.status(500).json({ message: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      const {
        userId,
        lotId,
        slotId,
        vehicle,
        vehicleNumber,
        contact,
        bST,
        bET,
        amount,
        pST,
        pET,
      } = bookingDetails;
      const slot = await Slot.findById(slotId);
      slot.history.push({ bookedBy: userId, bST, bET });
      await slot.save();

      // Step 5: Add Entry to BookingHistory
      const bookingHistory = new BookingHistory({
        userId,
        lotId,
        slotId,
        vehicle,
        vehicleNumber,
        contact,
        bST,
        bET,
        amount,
        status: "completed",
      });
      await bookingHistory.save();

      // Step 6: Release Redis Lock
      await redis.del(redisLockKey);
      res.status(200).json({ message: "Booked Slot Successfully" });
    } else res.status(400).json({ message: "Payment Not Completed" });
  } catch (error) {
    await redis.del(redisLockKey);
    res.status(500).json({ message: error.message });
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
      .populate("lotId", "name")
      .populate("slotId", "slotId slotType floor")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Booking history fetched", history });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching history", error: error.message });
  }
};
