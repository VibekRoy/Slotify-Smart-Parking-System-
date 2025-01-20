import { useForm } from "react-hook-form";
import useUserAuth from "../utils/useAuth";
import useLots from "../utils/useLots";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import "../styles/payment.css";
import {
  getNext24Hours,
  getNextSevenDays,
  getNextSevenDaysIST,
} from "../utils/useDate";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

function Payment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const selectedTime = watch("selectedTime");
  const [totalAmount, setTotalAmount] = useState(0);
  const [endTime, setEndTime] = useState(getNextSevenDaysIST()[0]);
  const setBooking = useLots((state) => state.setBooking);
  const selectedSlot = useLots((state) => state.selectedSlot);
  const userID = useUserAuth((state) => state.userID);
  const curDate = useLots((state) => state.curDate);
  const currentFloor = useLots((state) => state.floor);
  const selectedLot = useLots((state) => state.selectedLot);
  const [duration, setDuration] = useState(0);
  const availableTimes = useMemo(() => {
    if (!endTime) return [];
    if (endTime < curDate) return getNext24Hours(new Date(curDate));
    return getNext24Hours(new Date(endTime));
  }, [endTime, curDate]);

  const handleClick = () => {
    setBooking(false);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleFormSubmit = async (data) => {
    const now = new Date();
    if (curDate < now) return toast("Cannot book into the past!");

    const bookingDetails = {
      lotName: selectedLot.name,
      slotIdandType: `${selectedSlot.slotType}${selectedSlot.id}`,
      pST: `${curDate.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })} ${curDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })}`,
      pET: `${new Date(data.selectedTime).toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })} ${new Date(data.selectedTime).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })}`,
      userId: userID,
      slotId: selectedSlot._id,
      lotId: selectedLot.id,
      vehicle: data.vehicle,
      vehicleNumber: data.vehicleNumber,
      contact: data.contact,
      bST: curDate,
      bET: new Date(data.selectedTime),
      duration: duration,
      amount: totalAmount,
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios
        .post(`${apiUrl}/slots/bookslot`, bookingDetails, {
          withCredentials: true,
        })
        .catch((err) => {
          if (err.status === 400) {
            toast(err.response.data.message);
            return;
          }

          if (err.status === 500) {
            toast(err.response.data.message);
            return;
          }
        });

      if (response.status === 200) {
        const { sessionId } = response.data;
        const stripe = await loadStripe(
          import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        await stripe.redirectToCheckout({
          sessionId,
        });
      }
    } catch (err) {
      toast(err.response.data.message);
    }
  };

  const calculateTotal = useCallback(() => {
    if (!selectedTime || !selectedSlot) {
      setTotalAmount(0);
      return 0;
    }

    const exitTime = new Date(selectedTime);
    const durationInHours = Math.ceil((exitTime - curDate) / (1000 * 60 * 60));
    setDuration(durationInHours);
    let pricePerHour =
      selectedSlot.slotType === "B" ? selectedLot.bikePrice : selectedLot.price;
    let amount = durationInHours * pricePerHour;

    if (durationInHours >= 24) {
      amount *= 0.6; // Apply 40% discount
    } else if (durationInHours >= 12 && durationInHours < 24) {
      amount *= 0.8;
    }

    return amount;
  }, [selectedTime, curDate, selectedSlot, selectedLot]);

  useEffect(() => {
    const totalAmount = calculateTotal();
    setTotalAmount(totalAmount);
  }, [calculateTotal]);

  return (
    <div className="w-full bg-white h-full rounded-[7px] p-5 shadow-custom flex flex-col gap-4">
      <div className="h-[9%] flex justify-between">
        <div
          onClick={handleClick}
          className="flex justify-start items-center h-full  bg-[#FFC71F] text-2xl p-2 w-24 gap-1 rounded-full hover:shadow-md hover:scale-[1.1] transition-all duration-400 cursor-pointer">
          <MdOutlineArrowBackIosNew />
          <p className="text-xl">Slots</p>
        </div>
        <div className="flex gap-6">
          <div className="self-end text-xl font-semibold flex gap-3">
            <p>
              {curDate.toLocaleDateString("en-IN", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
            <p>
              {curDate.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
          <div className="text-lg self-center leading-tight font-medium">
            <p>
              Slot
              {" " + selectedSlot.slotType}
              {selectedSlot.id}
            </p>
            <p className="text-sm text-right">
              Floor
              {" " + currentFloor}
            </p>
          </div>
        </div>
      </div>

      <div className="h-[91%] w-full py-4 px-4 bg-white rounded-[7px] border-2 shadow-inner">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex justify-between flex-col h-full">
          <div>
            <div>
              <p className="pb-2">Enter Vehicle Information</p>
              <div className="w-full flex gap-4">
                <div className="relative flex w-1/2 flex-col">
                  <input
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    placeholder=""
                    className="peer payment-input"
                    {...register("vehicle", {
                      required: "Vehicle name is required",
                    })}
                  />
                  <label htmlFor="vehicle" className="payment-label">
                    Enter Vehicle Name
                  </label>
                  {errors.vehicle && (
                    <p className="text-red-500 text-xs mt-1 ml-2">
                      {errors.vehicle.message}
                    </p>
                  )}
                </div>
                <div className="relative flex w-1/2 flex-col">
                  <input
                    type="text"
                    id="vehicleNumber"
                    name="vehicleNumber"
                    placeholder=""
                    className="peer payment-input"
                    {...register("vehicleNumber", {
                      required: "Vehicle Number is required",
                    })}
                  />
                  <label htmlFor="vehicleNumber" className="payment-label">
                    Enter Vehicle Number
                  </label>
                  {errors.vehicleNumber && (
                    <p className="text-red-500 text-xs mt-1 ml-2">
                      {errors.vehicleNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="py-2">Select Exit Time</p>
              <div className="w-full flex gap-4">
                <div className="relative flex w-1/2">
                  <select
                    id="selectedDate"
                    {...register("selectedDate", {
                      required: "Date is required",
                    })}
                    className="payment-input-2"
                    onChange={handleEndTimeChange}>
                    <option>Select Date</option>
                    {getNextSevenDays(curDate).map((date) => (
                      <option key={date} value={date}>
                        {date.toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                  {errors.selectedDate && (
                    <p className="text-red-500 text-xs mt-1 ml-2">
                      {errors.selectedDate.message}
                    </p>
                  )}
                </div>
                <div className="relative flex w-1/2 flex-col">
                  <select
                    id="selectedTime"
                    className="payment-input-2"
                    {...register("selectedTime", {
                      required: "Time is required",
                    })}>
                    <option value="">Select Time</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </option>
                    ))}
                  </select>
                  {errors.selectedTime && (
                    <p className="text-red-500 text-xs mt-1 ml-2">
                      {errors.selectedTime.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="pb-2 pt-2">Enter Contact Information</p>
              <div className="w-full flex gap-4">
                <div className="relative flex w-1/2 flex-col">
                  <input
                    type="number"
                    id="contact"
                    name="contact"
                    placeholder=""
                    className="peer payment-input-3 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    {...register("contact", {
                      required: "Contact Number is required",
                    })}
                  />
                  <label htmlFor="contact" className="payment-label-3">
                    Enter Contact Number
                  </label>
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1 ml-2">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-semibold">
                Total: Rs {totalAmount}
              </div>
              <p className="text-xs text-gray-600">
                Prices are inclusive of GST
              </p>
              <p className="text-xs text-gray-600">
                GST is applicable at a rate of 18%
              </p>
            </div>
            <div className="text-2xl font-semibold">
              Interval: {duration} {duration <= 1 ? "Hour" : "Hours"}
            </div>

            <button
              type="submit"
              className="submit-button-payment items-center gap-2">
              <FaCreditCard />
              Proceed to Payment
            </button>
          </div>
          <p className="pt-2 text-xs text-gray-700">
            Note: 20% Discount applicable for duration more than 12 Hours and
            40% Discount applicable for duration more than 24 Hours.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Payment;
