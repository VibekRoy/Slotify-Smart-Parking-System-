import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const BookingHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
  bST: { type: Date, required: true },
  bET: { type: Date, required: true },
  status: {
    type: String,
    enum: ["completed", "cancelled"],
    default: "completed",
  },
  createdAt: { type: Date, default: Date.now },
});

export const BookingHistory = mongoose.model(
  "BookingHistory",
  BookingHistorySchema
);

export default mongoose.model("User", userSchema);
