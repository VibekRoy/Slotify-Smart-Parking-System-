import { FaBackward } from "react-icons/fa6";
import useLots from "../state/useLots";

function Payment() {
  const setBooking = useLots((state) => state.setBooking);
  const handleClick = () => {setBooking(false)};
  return (
    <div className="w-full bg-zinc-50 h-full rounded-[7px] p-6 shadow-md">
      <FaBackward onClick={handleClick} />
    </div>
  );
}

export default Payment;
