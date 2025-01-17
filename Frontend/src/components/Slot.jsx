import PropTypes from "prop-types";
import useLots from "../state/useLots";

function Slot({ id, status, bET, _id, lotId, slotType, price, bikePrice }) {
  const setBooking = useLots((state) => state.setBooking);
  const setSelectedSlot = useLots((state) => state.setSelectedSlot);
  const expiryDate = status ? new Date(bET) : null;
  const calcTime = (expiryTime) => {
    const currentTime = new Date();
    const timeDifference = new Date(expiryTime) - currentTime;
    const minutesRemaining = timeDifference / (1000 * 60);
    return minutesRemaining;
  };

  const isExpiringSoon = (expiryTime) => {
    const minutesRemaining = calcTime(expiryTime);
    return minutesRemaining < 60 && minutesRemaining > 0;
  };

  const getRemainingTime = (expiryTime) => {
    const minutesRemaining = calcTime(expiryTime);
    const hoursRemaining = minutesRemaining / 60;
    if (minutesRemaining < 60) {
      return `${Math.floor(minutesRemaining)} min`;
    } else {
      return `${Math.floor(hoursRemaining)} hour`;
    }
  };

  const handleClick = () => {
    if (!status) {
      setBooking(true);
      setSelectedSlot({ _id, lotId, id, status, slotType, price, bikePrice });
      console.log('clicked');
      
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`rounded-xl border  border-zinc-300 px-7 py-1 w-28 flex pb-1.5 flex-col justify-center flex-shrink-0 ${
        status
          ? isExpiringSoon(bET)
            ? "cursor-not-allowed bg-yellow-200 hover:bg-yellow-300"
            : "bg-red-200 hover:bg-red-300 cursor-not-allowed hover:border-none"
          : "hover:bg-blue-300 cursor-pointer hover:border-none"
      } transition-all duration-200 hover:scale-[1.15] `}>
      <div className="text-center pb-1 text-sm">
        {slotType}
        {id}
      </div>
      <img
        src={`../src/assets/${slotType === "B" ? "Bike" : "Car"}${
          status ? (isExpiringSoon(bET) ? "_Wait" : "_Booked") : ""
        }.svg`}
        alt="Car/Bike"
      />
      <div className="text-xs text-center pt-1">
        {status ? getRemainingTime(expiryDate) : "Available"}
      </div>
    </div>
  );
}

Slot.propTypes = {
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  bikePrice: PropTypes.number.isRequired,
  status: PropTypes.bool.isRequired,
  bET: PropTypes.string,
  _id: PropTypes.string.isRequired,
  lotId: PropTypes.string.isRequired,
  slotType: PropTypes.string.isRequired,
};
export default Slot;
