import PropTypes from "prop-types";
import useLots from "../utils/useLots";
import useUserAuth from "../utils/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isSlotAvailable } from "../utils/useDate";

function Slot({ id, _id, curDate, slotType, history }) {
  const setBooking = useLots((state) => state.setBooking);
  const [isAvailable, setIsAvailable] = useState(true);
  const setSelectedSlot = useLots((state) => state.setSelectedSlot);
  const isLoggedIn = useUserAuth((state) => state.isAuthenticated);
  const navigation = useNavigate();

  const handleClick = () => {
    if (isAvailable) {
      if (!isLoggedIn) {
        navigation("/login");
      }
      setBooking(true);
      setSelectedSlot({ _id, id, slotType, curDate });
    }
  };

  useEffect(() => {
    setIsAvailable(isSlotAvailable(history, curDate));
  }, [curDate, history]);

  return (
    <div
      onClick={handleClick}
      className={` rounded-xl border  border-zinc-300 px-7 py-1 w-28 flex pb-1.5 flex-col justify-center flex-shrink-0 ${
        isAvailable
          ? "hover:bg-blue-300 cursor-pointer hover:border-none"
          : "bg-red-200 hover:bg-red-300 cursor-not-allowed hover:border-none"
      } transition-all duration-200 hover:scale-[1.05] ease-in-out`}>
      <div className="text-center pb-1 text-sm">
        {slotType}
        {id}
      </div>
      <img
        src={`../src/assets/${slotType === "B" ? "Bike" : "Car"}${
          isAvailable ? "" : "_Booked"
        }.svg`}
        alt="Car/Bike"
      />
      <div className="text-xs text-center pt-1">
        {isAvailable ? "Available" : "Booked"}
      </div>
    </div>
  );
}

Slot.propTypes = {
  id: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  slotType: PropTypes.string.isRequired,
  history: PropTypes.array.isRequired,
  curDate: PropTypes.object.isRequired,
};
export default Slot;
