import {
    DirectionsRenderer,
    GoogleMap,
    Marker,
  } from "@react-google-maps/api";
  import useLocationStore from "../state/useLocationState";
  import { mapStyle } from "../styles/mapStyle";
  import "../styles/MapComponent.css";
  import useLots from "../state/useLots";
  import { useState, useEffect } from "react";
  
  const MapComponent = () => {
    const location = useLocationStore((state) => state.location);
    const selectedLot = useLots((state) => state.selectedLot);
    const lots = useLots((state) => state.lots);
    const [directions, setDirections] = useState(null);
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
  
    const mapContainerStyle = {
      width: "100%",
      height: "100%",
      borderRadius: "7px",
      boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.05), 0 6px 20px 0 rgba(0, 0, 0, 0.05)`,
    };
  
    const center = location
      ? { lat: location.latitude, lng: location.longitude }
      : { lat: 28.6139, lng: 77.2088 }; // Default center if no location is available
  
    // Fetch directions when location or selectedLot changes
    useEffect(() => {
      if (!location || !selectedLot) {
        setDirections(null);
        setDistance("");
        setDuration("");
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
              const leg = response.routes[0].legs[0];
              setDistance(leg.distance.text);
              setDuration(leg.duration.text);
            } else {
              console.error("Error fetching directions:", status);
            }
          }
        );
      };
  
      fetchDirections();
    }, [location, selectedLot]);
  
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
            icon={{ url: "../src/assets/CLM.svg" }}
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
              url: "../src/assets/p-logo.png",
            }}
            title={lot.name}
          />
        ))}
  
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#FF8200",
                strokeWeight: 6,
              },
            }}
          />
        )}
  
        
      </GoogleMap>
    );
  };
  
  export default MapComponent;
  