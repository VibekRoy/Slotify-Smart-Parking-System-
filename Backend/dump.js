const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the slot that is available (status: false means it's available)
    const slot = await Slot.findOne({ _id: slotID }, null, {
      session,
    });

    if (!slot) {
      // If no slot is found or the slot is already booked
      await session.abortTransaction();
      await session.endSession();
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Update the slot to be booked

    const updatedSlot = await Slot.findOneAndUpdate(
      { _id: slotID, status: false },
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
      vehicle,
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
  }const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Find the slot that is available (status: false means it's available)
      const slot = await Slot.findOne({ _id: slotID }, null, {
        session,
      });
  
      if (!slot) {
        // If no slot is found or the slot is already booked
        await session.abortTransaction();
        await session.endSession();
        return res.status(400).json({ message: "Slot already booked" });
      }
  
      // Update the slot to be booked
  
      const updatedSlot = await Slot.findOneAndUpdate(
        { _id: slotID, status: false },
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
        vehicle,
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