import { redisClient } from "../config/db.js";
import Slot from "../models/ParkingSlot.js";

export const createSlot = async (req, res) => {
  const { slotId } = req.body;

  const newSlot = new Slot({
    slotId,
    status: "available",
  });

  newSlot
    .save()
    .then(() => {
      res.json({ message: "Slot created successfully" });
      const redisKey = `allSlots:${slotId}`;
      const slotData = {
        status: newSlot.status,
        bookedBy: newSlot.bookedBy.toString(),
        bST: newSlot.bST.toISOString(),
        bET: newSlot.bET.toISOString(),
      };

      redisClient
        .hset(redisKey, slotData)
        .then(() => console.log("Cached to Redis"));
    })
    .catch(() => {
      res.status(409).json("Duplicate Slots Inserted. Creation FAILED");
    });
};

export const viewSlot = async (req, res) => {
  const keys = await redisClient.keys("allSlots:*");

  if (keys.length > 0) {
    const slots = [];
    for (const key of keys) {
      const slotData = await redisClient.hgetall(key);
      console.log(slotData);

      slots.push({
        _id:slotData._id,
        slotId: key.split(":")[1],
        status: slotData.status,
        bookedBy: slotData.bookedBy==="" ? null : slotData.bookedBy,
        bST: slotData.bST==="" ? null : slotData.bST,
        bET: slotData.bET==="" ? null : slotData.bET,
      });
    }

    res.json({ slots });
    console.log("Cached from Redis");
  } else {
    const slots = await Slot.find();
    
    for (const slot of slots) {
        console.log(slot);
        
      const redisKey = `allSlots:${slot.slotId}`;
      const slotData = {
        _id:slot._id,
        status: slot.status,
        bookedBy: slot.bookedBy ? slot.bookedBy.toString() : null,
        bST: slot.bST ? slot.bST.toISOString() : null,
        bET: slot.bET ? slot.bET.toISOString() : null,
      };

      redisClient.hset(redisKey, slotData);
    }
    res.json({ slots });
    console.log("Fetched From Database");
  }
};



export const bookSlot = async (req, res) => {
  const { slotId, bookedBy } = req.body;
};
