import { useEffect } from "react";
import MapComponent from "../components/MapComponent";
import useFetchUserLocation from "../utils/useFetchLocation";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Lots from "../components/Lots";
import useLots from "../utils/useLots";
import BookSlot from "../components/BookSlot";
import Payment from "../components/Payment";

function FindParking() {
  const { fetchLocation } = useFetchUserLocation();
  const selectedLot = useLots((state) => state.selectedLot);
  const isBooking = useLots((state) => state.isBooking);
  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <div className="h-[92%] w-full flex flex-col">
      <div className="flex h-[65%] w-full">
        <div
          className={`${
            selectedLot === null ? "w-full" : "w-1/2"
          } pl-12 pt-4 relative pr-12`}>
          <MapComponent />
          <button onClick={fetchLocation}>
            <FaLocationCrosshairs className="absolute right-[58px] bottom-[20%] shadow-xl bg-white text-[2.5rem] p-1.5 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50" />
          </button>
        </div>
        <div
          className={`${
            selectedLot === null
              ? "hidden"
              : "w-1/2 pr-12 pt-4 transition-all duration-200"
          } `}>
          {isBooking ? <Payment /> : <BookSlot />}
        </div>
      </div>
      <div className="h-[35%] bg-gradient-to-t from-zinc-300 from-10%">
        <Lots />
      </div>
    </div>
  );
}

export default FindParking;
