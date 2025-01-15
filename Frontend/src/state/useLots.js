import { create } from "zustand";

const useLots = create((set) => ({
  lots: [],
  setLots: (lots) => set({ lots }),

  selectedLot: null,
  setSelectedLot: (selectedLot) => set({ selectedLot }),
}));

export default useLots;
