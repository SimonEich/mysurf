"use client";
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function App1() {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  // Component to handle map clicks and update coordinates
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setCoordinates([lat, lng]);
      },
    });
    return null;
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1>Interactive Map</h1>
      <p>Click on the map to select coordinates.</p>
      <div style={{ height: "500px", width: "100%", marginBottom: "20px" }}>
        <MapContainer
          center={[51.505, -0.09]} // Default center (London)
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapClickHandler />
          {coordinates && <Marker position={coordinates}></Marker>}
        </MapContainer>
      </div>
      {coordinates ? (
        <div>
          <h2>Selected Coordinates</h2>
          <p>Latitude: {coordinates[0]}</p>
          <p>Longitude: {coordinates[1]}</p>
        </div>
      ) : (
        <p>No coordinates selected yet.</p>
      )}
    </div>
  );
}

export default App1;
