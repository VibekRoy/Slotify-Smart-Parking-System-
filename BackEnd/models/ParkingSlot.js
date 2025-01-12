import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  slotId: { type: String, required: true },
  lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
  status: { type: Boolean, default: false },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  bST: { type: Date, default: null },
  bET: { type: Date, default: null },
});

const LotSchema = new mongoose.Schema({
  lotId: { type: String, required: true, unique: true },
  name: { type: String, default: null },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

LotSchema.index({ location: "2dsphere" });

export const Lot = mongoose.model("Lot", LotSchema);
export const Slot = mongoose.model("Slot", SlotSchema);
