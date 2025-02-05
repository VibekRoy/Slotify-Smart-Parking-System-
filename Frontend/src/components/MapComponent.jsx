import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import useLocationStore from "../utils/useLocationState";
import { mapStyle } from "../styles/mapStyle";
import "../styles/MapComponent.css";
import useLots from "../utils/useLots";
import { useEffect } from "react";

const MapComponent = () => {
  const location = useLocationStore((state) => state.location);
  const selectedLot = useLots((state) => state.selectedLot);
  const directions = useLots((state) => state.directions);
  const setDirections = useLots((state) => state.setDirections);
  const lots = useLots((state) => state.lots);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "7px",
    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)`,
    border: `1px solid #e5e7eb`,
  };

  const center = location
    ? { lat: location.latitude, lng: location.longitude }
    : { lat: 28.6139, lng: 77.2088 };

  useEffect(() => {
    if (!location || !selectedLot) {
      setDirections(null);
      return;
    }

    const fetchDirections = async () => {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: location.latitude, lng: location.longitude },
          destination: {
            lat: selectedLot.latitude,
            lng: selectedLot.longitude,
          },
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK") {
            setDirections(response);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    };

    fetchDirections();
    return () => setDirections(null);
  }, [location, selectedLot, setDirections]);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={location ? 15 : 7}
      options={{
        streetViewControl: false,
        styles: mapStyle,
        fullscreenControl: false,
        mapTypeControl: false,
      }}>
      {location && (
        <Marker
          icon={{ url: "assets/CLM.svg" }}
          position={{ lat: location.latitude, lng: location.longitude }}
        />
      )}

      {lots?.map((lot, index) => (
        <Marker
          key={index}
          position={{
            lat: lot.location.coordinates[0],
            lng: lot.location.coordinates[1],
          }}
          icon={{
            url: "assets/p-logo.png",
          }}
          title={lot.name}
        />
      ))}

      {directions && (
        <DirectionsRenderer
          key={
            directions.request.destination.lat + directions.request.origin.lat
          }
          directions={directions}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: "#000",
              strokeWeight: 6,
            },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapComponent;
