import PropTypes from "prop-types";
import { TbLocationFilled } from "react-icons/tb";
import { FaCar, FaMotorcycle, FaCarSide } from "react-icons/fa";
import useLots from "../state/useLots";
import axios from "axios";
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
}) {
  const setSelectedLot = useLots((state) => state.setSelectedLot);
  const setSlots = useLots((state) => state.setSlots);
  const apiURL = import.meta.env.VITE_API_URL;
  const handleClick = async () => {
    setSelectedLot({ name, latitude, longitude, id, price, bikePrice, address });
    try {
      await axios
        .get(`${apiURL}/slots/${id}/viewslots`)
        .then((res) => {
          setSlots(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  const buttonStyle = `flex border-2 border-[#FFC71f] bg-[#FFC71F] text-xl font-semibold px-3 py-2.5 font-medium hover:bg-transparent cursor-pointer transition-all duration-200 hover:text-[#ffc71f] self-end rounded-xl`;
  return (
    <div className="h-48 bg-white rounded-3xl p-5 flex  w-[550px] flex-shrink-0 hover:bg-zinc-100">
      <div className=" w-[30%]">
        <img
          className="rounded-2xl"
          src={`../src/assets/LotImages/${index % 6}.jpg`}
          alt="LotImages"
        />
      </div>
      <div className="flex flex-col pl-4 justify-between w-[40%]">
        <div>
          <p className="text-lg font-semibold leading-[1.3rem] pb-1">{name}</p>
          <p className="text-sm text-zinc-700 w-[80%] leading-[1.1rem]">
            {address.split(",").slice(1, 4).join(",")}
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
  id: PropTypes.string.isRequired,
};

export default LotCard;
