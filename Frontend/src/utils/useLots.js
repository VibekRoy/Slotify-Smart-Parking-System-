import { create } from "zustand";

const useLots = create((set) => ({
  lots: [],
  setLots: (lots) => set({ lots }),

  slots: [],
  setSlots: (slots) => set({ slots }),

  floor: 1,
  setFloor: (floor) => set({ floor }),

  isBooking: false,
  setBooking: (isBooking) => set({ isBooking }),

  selectedSlot: null,
  setSelectedSlot: (selectedSlot) => set({ selectedSlot }),

  selectedLot: null,
  setSelectedLot: (selectedLot) => set({ selectedLot }),

  directions: null,
  setDirections: (directions) => set({ directions }),

  curDate: null,
  setCurDate: (curDate) => set({ curDate }),

  isVerified: false,
  setVerified: () => set({ isVerified: true }),
  setNotVerified: () => set({ isVerified: false }),
}));

export default useLots;
