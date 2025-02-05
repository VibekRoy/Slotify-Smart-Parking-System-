import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
function Dashboard() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/find");
  };
  return (
    <div>
      <div className=" text-[#0A0903] flex w-screen">
        <div className="w-1/2 flex items-center h-full text-7xl font-black pl-48 pt-28 flex-col">
          <div>
            Transforming{" "}
            <span className="text-[#FFC71F] text-8xl">Parking</span>,{" "}
            <span className="block">One</span>{" "}
            <span className="text-8xl text-[#FF8200]">Slot</span> at a Time
          </div>
          <div
            className="submit-button self-start mt-6 ml-8 scale-125"
            onClick={handleClick}>
            Book a slot today
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-start">
          <img
            src="assets/right_logo.png"
            alt="Parking_Image"
            className="w-4/6 pt-24"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
