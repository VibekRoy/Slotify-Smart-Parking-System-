import mongoose from "mongoose";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

export const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log(`Connected to Parking Slot Database at MongoDB Atlas`);
    });
  } catch (error) {
    console.log("Database Connect Error: ", error);
  }
};

export const redis = new Redis(process.env.REDIS_URL);
