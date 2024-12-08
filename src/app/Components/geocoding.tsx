"use client";
import React, { useState } from "react";

export function Geocoding() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setError(null);
    setCoordinates(null);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          city
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setCoordinates(data.results[0]);
      } else {
        setError("City not found. Please try another search.");
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>City Coordinates Finder</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {coordinates && (
        <div>
          <h2>Results:</h2>
          <p>
            <strong>City:</strong> {coordinates.name}
          </p>
          <p>
            <strong>Latitude:</strong> {coordinates.latitude}
          </p>
          <p>
            <strong>Longitude:</strong> {coordinates.longitude}
          </p>
          <p>
            <strong>Country:</strong> {coordinates.country}
          </p>
        </div>
      )}
    </div>
  );
}

