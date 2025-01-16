import { FaWindowClose } from "react-icons/fa";
import useLots from "../state/useLots";
import { useState } from "react";
import Slot from "./Slot";
import '../styles/slots.css'
function BookSlot() {
  const [floor, setFloor] = useState(1);
  const [floors, setFloors] = useState([1, 2, 3, 4]);
  const setLot = useLots((state) => state.setSelectedLot);
  const selectedSlot = useLots((state) => state.selectedSlot);
  const handleClick = () => {
    setLot(null);
  };
  const slots = [
    // Floor 1 - Series A
    ...Array.from({ length: 10 }, (_, i) => ({
      slotId: `A${i + 1}`,
      lotId: "1",
      floor: 1,
      status: i % 3 === 0, // Booked if index % 3 === 0
      bookedBy: i % 3 === 0 ? "user1" : null,
      bST: i % 3 === 0 ? new Date("2025-01-15T10:00:00Z") : null,
      bET: i % 3 === 0 ? new Date("2025-01-16T20:00:00Z") : null,
    })),
    // Floor 1 - Series B
    ...Array.from({ length: 8 }, (_, i) => ({
      slotId: `B${i + 1}`,
      lotId: "1",
      floor: 1,
      status: i % 4 === 0,
      bookedBy: i % 4 === 0 ? "user2" : null,
      bST: i % 4 === 0 ? new Date("2025-01-15T11:00:00Z") : null,
      bET: i % 4 === 0 ? new Date("2025-01-16T13:00:00Z") : null,
    })),
    // Floor 1 - Series C
    ...Array.from({ length: 6 }, (_, i) => ({
      slotId: `C${i + 1}`,
      lotId: "1",
      floor: 1,
      status: i % 2 === 0,
      bookedBy: i % 2 === 0 ? "user3" : null,
      bST: i % 2 === 0 ? new Date("2025-01-15T09:30:00Z") : null,
      bET: i % 2 === 0 ? new Date("2025-01-16T12:30:00Z") : null,
    })),
    // Floor 2 - Series D
    ...Array.from({ length: 8 }, (_, i) => ({
      slotId: `D${i + 1}`,
      lotId: "1",
      floor: 2,
      status: i % 2 !== 0,
      bookedBy: i % 2 !== 0 ? "user4" : null,
      bST: i % 2 !== 0 ? new Date("2025-01-15T08:00:00Z") : null,
      bET: i % 2 !== 0 ? new Date("2025-01-16T15:00:00Z") : null,
    })),
    // Floor 3 - Series E
    ...Array.from({ length: 5 }, (_, i) => ({
      slotId: `E${i + 1}`,
      lotId: "1",
      floor: 3,
      status: i % 2 === 0,
      bookedBy: i % 2 === 0 ? "user5" : null,
      bST: i % 2 === 0 ? new Date("2025-01-15T10:00:00Z") : null,
      bET: i % 2 === 0 ? new Date("2025-01-16T18:00:00Z") : null,
    })),
    // Floor 4 - Series F
    ...Array.from({ length: 3 }, (_, i) => ({
      slotId: `F${i + 1}`,
      lotId: "1",
      floor: 4,
      status: i % 2 !== 0,
      bookedBy: i % 2 !== 0 ? "user6" : null,
      bST: i % 2 !== 0 ? new Date("2025-01-15T07:00:00Z") : null,
      bET: i % 2 !== 0 ? new Date("2025-01-16T20:00:00Z") : null,
    })),
  ];

  return (
    <div className="w-full bg-zinc-50 h-full rounded-[7px] p-6 shadow-md">
      <div className="text-2xl font-semibold h-[10%] flex justify-between">
        <p>Select a slot</p>
        <FaWindowClose
          className="cursor-pointer hover:text-red-600"
          onClick={handleClick}
        />
      </div>
      <div className="h-[90%] flex flex-col gap-4">
        <div className="flex gap-4 h-[8.5%]">
          {floors.map((floor) => (
            <div
              key={floor}
              onClick={() => setFloor(floor)}
              className="px-5 text-md py-1.5 border bg-[#FFC71F] rounded-lg cursor-pointer hover:bg-[#FFb71F] hover:shadow-sm">
              Floor {floor}
            </div>
          ))}
        </div>
        <div className="h-[88%] w-full bg-white rounded-[7px] flex flex-wrap gap-4 p-6 items-center justify-center overflow-auto slot">
        
          {slots
            .filter((slot) => slot.floor === floor)
            .map((slot, index) => (
              <Slot key={index} id={slot.slotId} status={slot.status} bET={slot.bET?.toISOString()}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BookSlot;
