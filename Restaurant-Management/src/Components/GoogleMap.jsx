import { GoogleMap as GoogleMaps, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";

// Map styling
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Map Component
const GoogleMappp = () => {
  const center = {
    lat: 23.8103, // Dhaka Latitude
    lng: 90.4125, // Dhaka Longitude
  };

  return (
   <div className="mt-4">
     <LoadScript googleMapsApiKey="AIzaSyAiiqN9KAJ2GODWUpAjAmxsQdrPd8mySts"> {/* Replace with your API Key */}
      <GoogleMaps mapContainerStyle={containerStyle} center={center} zoom={11}>
        {/* Marker Example */}
        <Marker position={center} label="Dhaka" />
      </GoogleMaps>
    </LoadScript>
   </div>
  );
};

export default GoogleMappp;
