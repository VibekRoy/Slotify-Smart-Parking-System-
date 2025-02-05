import PropTypes from "prop-types";
import { TbLocationFilled } from "react-icons/tb";
import { FaCar, FaMotorcycle, FaCarSide } from "react-icons/fa";
import useLots from "../utils/useLots";
import axios from "axios";
import { toast } from "react-toastify";
function LotCard({
  index,
  name,
  distance,
  duration,
  price,
  bikePrice,
  address,
  latitude,
  longitude,
  id,
  floors,
}) {
  const setSelectedLot = useLots((state) => state.setSelectedLot);
  const setSlots = useLots((state) => state.setSlots);
  const setCurrentFloor = useLots((state) => state.setFloor);
  const setBooking = useLots((state) => state.setBooking);
  const apiURL = import.meta.env.VITE_API_URL;
  const handleClick = async () => {
    setBooking(false);
    setCurrentFloor(1);
    setSelectedLot({
      name,
      latitude,
      longitude,
      id,
      price,
      bikePrice,
      address,
      floors,
      distance,
      duration,
    });
    try {
      await axios
        .get(`${apiURL}/slots/${id}/viewslots`)
        .then((res) => {
          setSlots(res.data.slots);
        })
        .catch((err) => toast(err.response.data.message));
    } catch (error) {
      toast(error.response.data.message);
    }
  };
  const buttonStyle = `flex border-2 border-[#FFC71f] bg-[#FFC71F] text-xl font-semibold px-3 py-2.5 font-medium hover:bg-transparent cursor-pointer hover:scale-[1.01] transition-all duration-200 hover:text-[#ffc71f] self-end rounded-lg`;
  return (
    <div className="h-48 bg-white rounded-xl p-5 flex  w-[550px] flex-shrink-0 hover:bg-zinc-50 transition-all ease-in-out duration-300 hover:scale-[1.03]">
      <div className=" w-[30%] flex ">
        <img
          className="rounded-md "
          src={`assets/LotImages/${index % 6}.jpg`}
          alt="LotImages"
        />
      </div>
      <div className="flex flex-col pl-4 justify-between w-[40%]">
        <div>
          <p className="text-lg font-semibold leading-[1.3rem] pb-1">{name}</p>
          <p className="text-sm text-zinc-700 w-[80%] leading-[1.1rem]">
            {address.split(",").slice(1, 3).join(",")}
          </p>
        </div>
        <div>
          <div className="text-md font-medium text-gray-800 flex">
            <FaCarSide className="text-xl" />{" "}
            <p className="pl-2">Rs {price}/hr</p>{" "}
          </div>
          <div className="text-md font-medium text-gray-800 flex">
            <FaMotorcycle className="text-xl" />{" "}
            <p className="pl-2">Rs {bikePrice}/hr</p>{" "}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-[30%]">
        <div>
          <div className=" flex items-center justify-end pb-2">
            <span className="pr-2 text-sm">{distance}</span>
            <TbLocationFilled className="text-xl" />
          </div>
          <div className=" flex items-center justify-end">
            <span className="pr-2 text-sm text-right">{duration}</span>
            <FaCar className="text-xl" />
          </div>
        </div>

        <button className={buttonStyle} onClick={handleClick}>
          View Slots
        </button>
      </div>
    </div>
  );
}

LotCard.propTypes = {
  name: PropTypes.string.isRequired,
  distance: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  bikePrice: PropTypes.number.isRequired,
  address: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  floors: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default LotCard;
