export const getNextSevenDaysIST = () => {
  const now = new Date();
  const result = [];
  const istNow = new Date(now.getTime());

  const firstDate = new Date(istNow);
  firstDate.setMinutes(0, 0, 0);
  firstDate.setHours(firstDate.getHours() + 1);

  result.push(firstDate);

  // Add subsequent days at IST midnight
  for (let i = 1; i <= 7; i++) {
    const nextMidnight = new Date(firstDate);
    nextMidnight.setDate(nextMidnight.getDate() + i); // Increment day
    nextMidnight.setHours(0, 0, 0, 0); // Set to midnight
    result.push(nextMidnight);
  }

  return result.map((date) => new Date(date.getTime())); // Convert back to IST
};

export const getNextSevenDays = (date) => {
  const now = new Date(date);
  const result = [];
  const istNow = new Date(now.getTime());

  const firstDate = new Date(istNow);
  firstDate.setMinutes(0, 0, 0);
  firstDate.setHours(firstDate.getHours() + 1);

  result.push(firstDate);

  // Add subsequent days at IST midnight
  for (let i = 1; i <= 7; i++) {
    const nextMidnight = new Date(firstDate);
    nextMidnight.setDate(nextMidnight.getDate() + i); // Increment day
    nextMidnight.setHours(0, 0, 0, 0); // Set to midnight
    result.push(nextMidnight);
  }

  return result.map((date) => new Date(date.getTime())); // Convert back to IST
};

export const getNext24Hours = (curDate) => {
  const cur = new Date(curDate); // Ensure curDate is a Date object
  const result = [];

  // Add the first hour (curDate) to the result array
  result.push(new Date(cur));

  // Now loop until 12 AM (midnight)

  while (cur.getHours() !== 23) {
    cur.setHours(cur.getHours() + 1); // Increment by 1 hour
    result.push(new Date(cur)); // Push a copy of the updated date
  }

  return result;
};

export const isSlotAvailable = (history, targetDate) => {
  // Ensure targetDate is a valid Date object

  if (!(targetDate instanceof Date)) {
    throw new Error("Invalid targetDate. Must be a Date object.");
  }

  // If history is empty, the slot is available
  if (!history || history.length === 0) {
    return true;
  }

  // Iterate over the history array
  for (const record of history) {
    const { bST, bET } = record;

    // Ensure bST and bET are Date objects
    const bookingStartTime = new Date(bST);
    const bookingEndTime = new Date(bET);

    // Check if the target date overlaps with the booking period
    if (
      targetDate >= bookingStartTime && // Target date falls after or at the start
      targetDate < bookingEndTime // Target date falls before the end
    ) {
      return false; // Slot is not available
    }
  }

  return true; // Slot is available
};
