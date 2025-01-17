import useLots from "../state/useLots";
import { useEffect, useState } from "react";
import Slot from "./Slot";
import "../styles/slots.css";
import { BiSolidNavigation } from "react-icons/bi";
import useLocationStore from "../state/useLocationState";
function BookSlot() {
  const [floors, setFloors] = useState([]);
  const setLot = useLots((state) => state.setSelectedLot);
  const selectedLot = useLots((state) => state.selectedLot);
  const slots = useLots((state) => state.slots);
  const currentFloor = useLots((state) => state.floor);
  const setCurrentFloor = useLots((state) => state.setFloor);
  const location = useLocationStore((state) => state.location);
  useEffect(() => {
    let floorArray = [];
    for (let i = 1; i <= selectedLot?.floors; i++) {
      floorArray.push(i);
    }

    setFloors(floorArray);
  }, [selectedLot]);

  const handleClick = () => {
    setLot(null);
  };

  const navigationDirections = () => {
    const origin = `${location.latitude},${location.longitude}`;
    const destination = `${selectedLot.latitude},${selectedLot.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full bg-zinc-50 h-full rounded-[7px] p-6 shadow-md">
      <div className=" font-semibold h-[10%] flex justify-between">
        <div className="flex gap-2">
          <p className="text-2xl text-zinc-800">{selectedLot?.name}</p>
          <p className="pt-0.5 text-xl text-zinc-600 font-normal">
            - {selectedLot?.distance} away
          </p>
        </div>
        <div className="flex">
          <button
            onClick={navigationDirections}
            className="text-lg text-zinc-50 bg-blue-600 px-4 rounded-[7px] mr-2 h-12 flex items-center gap-3">
            <BiSolidNavigation />
            <p>Directions</p>
          </button>
          <button
            onClick={handleClick}
            className="text-lg text-zinc-50 bg-red-500 px-6 rounded-[7px] h-12">
            Close
          </button>
        </div>
      </div>
      <div className="h-[90%] flex flex-col gap-4">
        <div className="flex gap-4 h-[8.5%]">
          <p className="text-lg self-end">Select Floor: </p>
          {floors.map((floor) => (
            <div
              key={floor}
              onClick={() => setCurrentFloor(floor)}
              className="px-5 text-md py-1.5 border bg-[#FFC71F] rounded-lg cursor-pointer hover:bg-[#FFb71F] hover:shadow-sm">
              Floor {floor}
            </div>
          ))}
        </div>
        <div className="h-[88%] w-full bg-white rounded-[7px] flex flex-wrap gap-4 p-6 items-center justify-center overflow-auto slot">
          {slots
            .filter((slot) => slot.floor === currentFloor)
            .sort((a, b) => {
              if (a.slotType < b.slotType) return 1;
              if (a.slotType > b.slotType) return -1;
              return a.slotId - b.slotId;
            })
            .map((slot, index) => (
              <Slot
                key={index}
                id={slot.slotId}
                slotType={slot.slotType}
                _id={slot._id}
                lotId={slot.lotId}
                status={slot.status}
                bET={slot.bET?.toISOString()}
                price={selectedLot?.price}
                bikePrice={selectedLot?.bikePrice}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default BookSlot;
