import { useForm } from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock } from "react-icons/fa";
import "../styles/Dashboard.css";
function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Submitted: ", data);
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
        </div>
        <div className="w-1/2 flex justify-center items-start">
          <img
            src="../src/assets/right_logo.png"
            alt="Parking_Image"
            className="w-4/6 pt-24"
          />
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="text-center text-4xl font-bold pb-10 pt-16">
          BOOK A SLOT TODAY
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow-xl flex justify-center justify-self-center w-fit rounded-3xl bg-zinc-50">
            <div className="w-72 border-y border-l h-32 p-4 rounded-l-3xl flex justify-center items-center gap-6 ">
              <div className="w-1/6 text-5xl text-[#FFC71F]">
                <FaLocationDot />
              </div>
              <div className="w-4/6">
                <p className="pb text-md text-zinc-700 w-5/6">Enter Location</p>
                <input
                  className="border-b-2 border-zinc-500 outline-none w-40 bg-zinc-50"
                  id="location"
                  type="text"
                  placeholder="Place name"
                  {...register("location", {
                    required: "Location is required",
                    maxLength: {
                      value: 50,
                      message: "Location must be 50 characters or less",
                    },
                  })}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-72 border-y border-l h-32 p-4  flex justify-center items-center gap-6 ">
              <div className="w-1/6 text-5xl text-[#FFC71F]">
                <FaCalendarAlt />
              </div>
              <div className="w-4/6">
                <p className="pb text-md text-zinc-700 w-5/6">Enter Date</p>
                <input
                  className="border-b-2 border-zinc-500 outline-none w-40 bg-zinc-50"
                  id="date"
                  type="date"
                  placeholder=""
                  {...register("date", {
                    required: "Date is required",
                  })}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-72 border-y border-l h-32 p-4  flex justify-center items-center gap-6 ">
              <div className="w-1/6 text-5xl text-[#FFC71F]">
                <FaClock />
              </div>
              <div className="w-4/6">
                <p className="pb text-md text-zinc-700 w-5/6">Enter Time</p>
                <input
                  id="time"
                  type="time"
                  className="border-b-2 border-zinc-500 outline-none w-40 bg-zinc-50"
                  {...register("time", {
                    required: "Time is required",
                  })}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.time.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-64 h-32 p-4 rounded-r-3xl font-black bg-[#FFC71F] text-black text-2xl">
              <p>SEARCH</p>
              <p>PARKING LOTS</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
