import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  slotId: { type: Number, required: true },
  slotType: { type: String, enum: ["C", "B"], required: true },
  lotId: { type: mongoose.Schema.Types.ObjectId, ref: "Lot", required: true },
  floor: { type: Number, required: true },
  history: [
    {
      bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      bST: { type: Date, required: true },
      bET: { type: Date, required: true },
    },
  ],
});

const LotSchema = new mongoose.Schema({
  lotId: { type: String, required: true, unique: true },
  name: { type: String, default: null },
  price: { type: Number, default: 50 },
  bikePrice: { type: Number, default: 23 },
  floors: { type: Number, default: 0 },
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
