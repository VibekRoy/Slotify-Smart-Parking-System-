import PropTypes from "prop-types";
import { TbLocationFilled } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import useLots from "../state/useLots";
function LotCard({
  index,
  name,
  distance,
  duration,
  price,
  address,
  latitude,
  longitude,
}) {
  const setSelectedLot = useLots((state) => state.setSelectedLot);

  const handleClick = () => {
    setSelectedLot({ name, latitude, longitude });
  };
  const buttonStyle = `flex border-2 border-[#FFC71f] bg-[#FFC71F] text-xl font-semibold px-3 py-2.5 font-medium hover:bg-transparent cursor-pointer transition-all duration-200 hover:text-[#ffc71f] self-end rounded-xl`;
  return (
    <div className="h-48 bg-white rounded-3xl p-5 flex  w-[550px] flex-shrink-0 hover:bg-zinc-100 cursor-pointer">
      <div onClick={handleClick} className=" w-[30%]">
        <img
          className="rounded-2xl"
          src={`../src/assets/LotImages/${index % 6}.jpg`}
          alt="LotImages"
        />
      </div>
      <div onClick={handleClick} className="flex flex-col pl-4 justify-between w-[40%]">
        <div>
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-zinc-700 w-[80%]">
            {address.split(",").slice(1, 4).join(",")}
          </p>
        </div>
        <p className="text-xl font-medium text-gray-800">Rs {price}/hr</p>
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

        <button className={buttonStyle}>View Slots</button>
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
  address: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default LotCard;
