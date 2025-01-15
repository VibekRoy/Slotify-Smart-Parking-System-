import { useEffect } from "react";
import MapComponent from "../components/MapComponent";
import useFetchUserLocation from "../state/useFetchLocation";
import { FaLocationCrosshairs } from "react-icons/fa6";
import Lots from "../components/Lots";

function FindParking() {
  const { fetchLocation } = useFetchUserLocation();

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <div className="h-[92%] w-full flex flex-col">
      <div className="flex h-[65%] ">
        <div className="w-7/12 pl-12 pt-4 relative">
          <MapComponent />
          <button onClick={fetchLocation}>
            <FaLocationCrosshairs className="absolute right-[10px] bottom-[20%] shadow-xl bg-white text-[2.5rem] p-1.5 rounded-full text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50" />
          </button>
        </div>
        <div className="w-5/12">BOOK LOT</div>
      </div>
      <div className="h-[35%] bg-gradient-to-t from-zinc-200 from-1%">
        <Lots />
      </div>
    </div>
  );
}

export default FindParking;
