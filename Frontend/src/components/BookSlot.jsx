import { FaWindowClose } from "react-icons/fa";
import useLots from "../state/useLots";

function BookSlot() {
  const setLot = useLots((state) => state.setSelectedLot);
  const setDirections = useLots((state) => state.setDirections);
  const directions = useLots((state) => state.directions);
  const handleClick = () => {
    setLot(null);
    setDirections(null);
    console.log(directions);
  };
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
          <div className="px-5 text-md py-1.5 border bg-[#FFC71F] rounded-lg cursor-pointer hover:bg-[#FFb71F] hover:shadow-sm">
            1st Floor
          </div>
          <div className="px-5 text-md py-1.5 border bg-[#FFC71F] rounded-lg cursor-pointer hover:bg-[#FFb71F] hover:shadow-sm">
            2nd Floor
          </div>
          <div className="px-5 text-md py-1.5 border bg-[#FFC71F] rounded-lg cursor-pointer hover:bg-[#FFb71F] hover:shadow-sm">
            3rd Floor
          </div>
          <div className="px-5 text-md py-1.5 border bg-[#FFC71F] rounded-lg cursor-pointer hover:bg-[#FFb71F] hover:shadow-sm">
            4th Floor
          </div>
        </div>
        <div className="h-[88%] bg-white rounded-[7px]">
          
        </div>
      </div>
    </div>
  );
}

export default BookSlot;
