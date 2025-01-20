import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/find");
  };

  const handleClick1 = () => {
    navigate("/find");
  };
  return (
    <div className="h-full w-full flex justify-center items-center flex-col">
      <div className="text-6xl text-red-700">
        Uh-ho!!! Something went wrong. Please try again!
      </div>
      <div className="flex gap-4">
        <div
          onClick={handleClick1}
          className="bg-[#ffc71f] text-4xl px-12 py-8 rounded-3xl mt-12 cursor-pointer font-normal hover:bg-[#ffb41f] hover:scale-105 transition-all duration-300 uppercase">
          Go to Dashboard
        </div>
        <div
          onClick={handleClick}
          className="bg-[#ffc71f] text-4xl px-12 py-8 rounded-3xl mt-12 cursor-pointer font-normal hover:bg-[#ffb41f] hover:scale-105 transition-all duration-300 uppercase">
          Book Again
        </div>
      </div>
    </div>
  );
}

export default Cancel;
