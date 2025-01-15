import axios from "axios";
import { useEffect } from "react";
import useLocationStore from "../state/useLocationState";
import LotCard from "./LotCard";
import "../styles/lot.css";
import useLots from "../state/useLots";
function Lots() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const location = useLocationStore((state) => state.location);
  const setLot = useLots((state) => state.setLots);
  const lots = useLots((state) => state.lots);
  useEffect(() => {
    const fetchLots = async () => {
      try {
        const response = await axios.get(`${apiUrl}/slots/viewlots`);
        const fetchedLots = response.data.lots;

        const distances = fetchedLots
          .map(
            (lot) =>
              `${lot.location.coordinates[0]},${lot.location.coordinates[1]}`
          )
          .join("|");

        try {
          const distanceResponse = await axios.get(`${apiUrl}/slots/distance`, {
            params: {
              origins: `${location.latitude},${location.longitude}`,
              destinations: distances,
            },
          });

          const updatedDetails = fetchedLots.map((lot, index) => ({
            ...lot,
            distance:
              distanceResponse.data.rows[0].elements[index].distance.text,
            duration:
              distanceResponse.data.rows[0].elements[index].duration.text,
            distanceValue:
              distanceResponse.data.rows[0].elements[index].distance.value,
            address: distanceResponse.data.destination_addresses[index],
          }));

          updatedDetails.sort((a, b) => a.distanceValue - b.distanceValue);
          setLot(updatedDetails);
        } catch (error) {
          console.error("Error getting distances:", error.message);
        }
      } catch (err) {
        console.error("Error fetching lots:", err.message);
      }
    };

    if (location) {
      fetchLots();
    }
  }, [apiUrl, location, setLot]);
  return (
    <div className="pl-12 pr-12 w-full">
      <div className="text-3xl font-semibold pt-6 pb-4 pl-2">
        Nearby parking lots
      </div>
      <div className="flex gap-5 overflow-x-auto lot pb-2">
        {lots?.map((lot, index) => (
          <LotCard
            name={lot.name}
            key={index}
            distance={lot.distance}
            duration={lot.duration}
            index={index + 1}
            price={lot.price}
            address={lot.address}
            latitude={lot.location.coordinates[0]}
            longitude={lot.location.coordinates[1]}
          />
        ))}
      </div>
    </div>
  );
}

export default Lots;
