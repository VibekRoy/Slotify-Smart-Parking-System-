import useLots from "../utils/useLots";
import { useEffect, useRef, useState } from "react";
import Slot from "./Slot";
import "../styles/slots.css";
import { BiSolidNavigation } from "react-icons/bi";
import useLocationStore from "../utils/useLocationState";
import { getNext24Hours, getNextSevenDaysIST } from "../utils/useDate";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
function BookSlot() {
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const [floors, setFloors] = useState([]);
  const [dateArray, setDateArray] = useState([]);
  const [timeArray, setTimeArray] = useState([]);
  const [dateColor, setDateColor] = useState();
  const setLot = useLots((state) => state.setSelectedLot);
  const selectedLot = useLots((state) => state.selectedLot);
  const slots = useLots((state) => state.slots);
  const currentFloor = useLots((state) => state.floor);
  const setCurrentFloor = useLots((state) => state.setFloor);
  const location = useLocationStore((state) => state.location);
  const setSelectedSlot = useLots((state) => state.setSelectedSlot);
  const setCurDate = useLots((state) => state.setCurDate);
  const curDate = useLots((state) => state.curDate);
  useEffect(() => {
    let floorArray = [];
    for (let i = 1; i <= selectedLot?.floors; i++) {
      floorArray.push(i);
    }

    setFloors(floorArray);
  }, [selectedLot]);

  useEffect(() => {
    let dateArr = getNextSevenDaysIST();
    setDateArray(dateArr);
    let timeArr = getNext24Hours(dateArr[0]);
    setTimeArray(timeArr);
    setCurDate(timeArr[0]);
    setDateColor(dateArr[0]);
  }, [setCurDate]);

  const handleClick = () => {
    setLot(null);
  };

  const scroll = (ref, scrollOffset) => {
    ref.current.scrollBy({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

  const navigationDirections = () => {
    const origin = `${location.latitude},${location.longitude}`;
    const destination = `${selectedLot.latitude},${selectedLot.longitude}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full border bg-white h-full rounded-[7px] p-4 shadow-custom">
      <div className=" font-semibold h-[10%] mb-4 flex justify-between">
        <div className="flex gap-2">
          <p className="text-2xl text-zinc-800">{selectedLot?.name}</p>
          <p className="pt-0.5 text-xl text-zinc-600 font-normal">
            - {selectedLot?.distance} away
          </p>
        </div>
        <div className="flex">
          <button
            onClick={navigationDirections}
            className="text-lg text-zinc-50 bg-blue-600 px-4 rounded-[50px] mr-3 h-12 flex items-center gap-3 hover:scale-[1.1] hover:bg-blue-700 transition-all ease-in-out duration-300">
            <BiSolidNavigation />
            <p>Directions</p>
          </button>
          <button
            onClick={handleClick}
            className="text-lg text-zinc-50 bg-red-500 px-6 rounded-[50px] h-12 hover:scale-[1.1] hover:bg-red-600 transition-all ease-in-out duration-300">
            Close
          </button>
        </div>
      </div>
      <div className="h-[90%] flex flex-col gap-4">
        <div className="flex justify-between h-[8.5%]">
          <div className="flex gap-2 h-full">
            {floors.map((floor) => (
              <div
                key={floor}
                onClick={() => setCurrentFloor(floor)}
                className={`px-5 text-md py-1.5 flex self-center ${
                  currentFloor === floor ? "bg-[#FF8200]" : "bg-[#FFC71F]"
                } rounded-full cursor-pointer  hover:shadow-sm hover:scale-[1.1] transition-all ease-in-out duration-300`}>
                Floor {floor}
              </div>
            ))}
          </div>

          <div className="flex w-1/2 items-center ">
            <div
              onClick={() => {
                scroll(dateRef, -100);
              }}>
              <MdOutlineArrowBackIosNew className="text-2xl" />
            </div>
            <div
              ref={dateRef}
              className="flex w-full gap-2 overflow-auto no-scrollbar relative">
              {dateArray.map((date) => (
                <div
                  onClick={() => {
                    setTimeArray(getNext24Hours(date));
                    setDateColor(date);
                  }}
                  key={date}
                  className={`px-5 flex-shrink-0 text-md py-1.5 flex self-center ${
                    dateColor === date ? "bg-[#FF8200]" : "bg-[#FFC71F]"
                  }  rounded-full cursor-pointer  hover:shadow-sm hover:scale-[1.04] transition-all ease-in-out duration-300`}>
                  {date.toLocaleDateString("en-IN", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              ))}
            </div>
            <div
              onClick={() => {
                scroll(dateRef, 125);
              }}>
              <MdOutlineArrowForwardIos className="text-2xl" />
            </div>
          </div>
        </div>
        <div className="h-[85%] w-full border-2 shadow-inner rounded-[7px]  py-2 px-2  ">
          <div className="w-full flex h-[13%]">
            {/*Time Array with scroll*/}
            <div className="flex items-center  w-full">
              <div
                onClick={() => {
                  scroll(timeRef, -200);
                }}>
                <MdOutlineArrowBackIosNew className="text-2xl" />
              </div>
              <div
                ref={timeRef}
                className="flex w-full gap-2 overflow-scroll no-scrollbar">
                {timeArray.map((time) => (
                  <div
                    key={time}
                    onClick={() => {
                      setCurDate(time);
                    }}
                    className={`px-5 flex-shrink-0 text-md py-1.5 flex self-center  ${
                      curDate === time ? "bg-[#FF8200]" : "bg-[#FFC71F]"
                    }  rounded-full cursor-pointer  hover:shadow-sm hover:scale-[1.04] transition-all ease-in-out duration-300`}>
                    {time.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                ))}
              </div>
              <div
                onClick={() => {
                  scroll(timeRef, 200);
                }}>
                <MdOutlineArrowForwardIos className="text-2xl" />
              </div>
            </div>
          </div>

          {/*Slot Array*/}
          <div className="h-[84%] w-full flex flex-wrap gap-2 items-center justify-center  no-scrollbar overflow-auto mt-3">
            {slots
              .filter((slot) => slot.floor === currentFloor)
              .sort((a, b) => {
                if (a.slotType < b.slotType) return 1;
                if (a.slotType > b.slotType) return -1;
                return a.slotId - b.slotId;
              })
              .map((slot, index) => (
                <Slot
                  onClick={() => {
                    setSelectedSlot(slot);
                  }}
                  key={index}
                  id={slot.slotId}
                  slotType={slot.slotType}
                  _id={slot._id}
                  history={slot.history}
                  curDate={curDate}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSlot;
