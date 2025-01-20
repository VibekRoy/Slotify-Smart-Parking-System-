import { useEffect, useState } from "react";
import useUserAuth from "../utils/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

function History() {
  const userID = useUserAuth((state) => state.userID);
  const userName = useUserAuth((state) => state.userName);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    const apiURL = import.meta.env.VITE_API_URL;
    const getHistory = async () => {
      try {
        const response = await axios.get(`${apiURL}/slots/history`, {
          withCredentials: true,
        });
        setBookingHistory(response.data.history);
      } catch (error) {
        toast(error.response.data.message);
      }
    };

    getHistory();
  }, []);
  return (
    <div className="h-full w-full ">
        <div className="text-5xl pl-10 pt-10 font-bold">HISTORY</div>
      <div className="flex w-full px-10 pt-5 ">
        <div className="text-center border py-2 uppercase font-semibold border-black w-[5%]">Sl No</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[19%]">Lot Name</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[10%]">Slot Details</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[12%]">Booked at</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[10%]">Amount</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[10%]">Contact</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[12%]">Start Time</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[12%]">End Time</div>
        <div className="text-center border py-2 uppercase font-semibold border-black w-[10%]">Action</div>
      </div>
      <div>
        {bookingHistory.map((history,index)=>(
            <div key={index} className="flex w-full px-10 ">
            <div className="text-center border py-2 text-sm border-black w-[5%]">{index+1}</div>
            <div className="text-center border py-2 text-sm border-black w-[19%]">{history.lotId.name}</div>
            <div className="text-center border py-2 text-sm border-black w-[10%]">F{history.slotId.floor}-{history.slotId.slotType}{history.slotId.slotId}</div>
            <div className="text-center border py-2 text-sm border-black w-[12%]">{new Date(history.createdAt).toLocaleString('en-GB')}</div>
            <div className="text-center border py-2 text-sm border-black w-[10%]">Rs {history.amount}</div>
            <div className="text-center border py-2 text-sm border-black w-[10%]">+91-{history.contact}</div>
            <div className="text-center border py-2 text-sm border-black w-[12%]">{new Date(history.bST).toLocaleString('en-GB')}</div>
            <div className="text-center border py-2 text-sm border-black w-[12%]">{new Date(history.bET).toLocaleString('en-GB')}</div>
            <div className="text-center border flex justify-center py-2 text-sm border-black w-[10%]"><div className="bg-red-500 w-[150px] h-[30px] flex justify-center items-center text-white rounded-md">Cancel</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;


/*[
    {
        "_id": "678df89b21ed1b63918a6db2",
        "userId": "6786130a22e5834716d3a425",
        "lotId": {
            "_id": "6789114e3df5282c2f8e7797",
            "name": "Pizza Hut Lot"
        },
        "slotId": {
            "_id": "67891b4660efb5d964257daa",
            "slotId": 5,
            "slotType": "C",
            "floor": 1
        },
        "vehicle": "Splendor",
        "vehicleNumber": "JH10F 4582",
        "contact": 9234603025,
        "amount": 270,
        "bST": "2025-01-20T22:30:00.000Z",
        "bET": "2025-01-21T04:30:00.000Z",
        "status": "completed",
        "createdAt": "2025-01-20T07:17:47.478Z",
        "__v": 0
    },
    {
        "_id": "678dd74a21ed1b63918a6d91",
        "userId": "6786130a22e5834716d3a425",
        "lotId": {
            "_id": "6789114e3df5282c2f8e7797",
            "name": "Pizza Hut Lot"
        },
        "slotId": {
            "_id": "67891b4660efb5d964257dc4",
            "slotId": 21,
            "slotType": "C",
            "floor": 2
        },
        "vehicle": "ghfghghf",
        "vehicleNumber": "hfhgfghfgh",
        "contact": 100215444844,
        "amount": 468,
        "bST": "2025-01-20T05:30:00.000Z",
        "bET": "2025-01-20T18:30:00.000Z",
        "status": "completed",
        "createdAt": "2025-01-20T04:55:38.432Z",
        "__v": 0
    },
    {
        "_id": "678dd58621ed1b63918a6d84",
        "userId": "6786130a22e5834716d3a425",
        "lotId": {
            "_id": "6789114e3df5282c2f8e7797",
            "name": "Pizza Hut Lot"
        },
        "slotId": {
            "_id": "67891b4660efb5d964257db4",
            "slotId": 15,
            "slotType": "C",
            "floor": 1
        },
        "vehicle": "Splendor",
        "vehicleNumber": "jh10kfds23",
        "contact": 7004580388,
        "amount": 45,
        "bST": "2025-01-20T05:30:00.000Z",
        "bET": "2025-01-20T06:30:00.000Z",
        "status": "completed",
        "createdAt": "2025-01-20T04:48:06.631Z",
        "__v": 0
    }
] */