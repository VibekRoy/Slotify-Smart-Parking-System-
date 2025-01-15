import useLocationStore from "./useLocationState";

const useFetchUserLocation = () => {
  const setLocation = useLocationStore((state) => state.setLocation);

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return { fetchLocation };
};

export default useFetchUserLocation;
