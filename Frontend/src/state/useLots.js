import { create } from "zustand";

const useLots = create((set) => ({
  lots: [],
  setLots: (lots) => set({ lots }),

  selectedLot: null,
  setSelectedLot: (selectedLot) => set({ selectedLot }),

  directions: null,
  setDirections: (directions) => set({ directions }),
}));

export default useLots;
