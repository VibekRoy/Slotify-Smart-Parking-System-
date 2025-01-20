import { findOne, findOneAndUpdate } from "./models/Slot"; // Import the Slot model

const bookSlot = async ({ slotId, userId, bST, bET }) => {
  try {
    // Convert bST and bET to Date objects
    const bookingStartTime = new Date(bST);
    const bookingEndTime = new Date(bET);

    // Step 1: Check if the slot is free during the booking time
    const slot = await findOne({
      slotId,
      $nor: [
        {
          history: {
            $elemMatch: {
              $or: [
                { bST: { $lt: bookingEndTime, $gte: bookingStartTime } }, // Overlapping start
                { bET: { $lte: bookingEndTime, $gt: bookingStartTime } }, // Overlapping end
                { bST: { $lte: bookingStartTime }, bET: { $gte: bookingEndTime } }, // Fully covered
              ],
            },
          },
        },
      ],
    });

    if (!slot) {
      return { success: false, message: "Slot is already booked for the specified time." };
    }

    // Step 2: Update the slot with the new booking
    const updatedSlot = await findOneAndUpdate(
      { slotId },
      {
        $push: {
          history: {
            bookedBy: userId,
            bST: bookingStartTime,
            bET: bookingEndTime,
          },
        },
        status: true, // Mark slot as occupied
        bookedBy: userId,
        bST: bookingStartTime,
        bET: bookingEndTime,
      },
      { new: true } // Return the updated document
    );

    return { success: true, message: "Slot booked successfully!", slot: updatedSlot };
  } catch (error) {
    console.error("Error booking slot:", error);
    return { success: false, message: "An error occurred during booking." };
  }
};
