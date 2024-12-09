'use client';
import React, { useState } from "react";

export function Geocoding() {
  const [city, setCity] = useState<string>(""); // City input
  const [suggestions, setSuggestions] = useState<
    { name: string; latitude: number; longitude: number; country: string; elevation: number }[]
  >([]);
  const [error, setError] = useState<string | null>(null); // Error message

  const fetchElevation = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.open-elevation.com/api/v1/lookup?locations=${latitude},${longitude}`
      );
      if (response.ok) {
        const data = await response.json();
        return data.results[0]?.elevation ?? null; // Return elevation or null
      }
      return null;
    } catch {
      return null; // In case of an error, return null
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setError(null);
    setSuggestions([]);

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Fetch elevation data for each result and filter places within 200 meters of sea level
        const enrichedResults = await Promise.all(
          data.results.map(async (place: any) => {
            const elevation = await fetchElevation(place.latitude, place.longitude);
            return { ...place, elevation };
          })
        );

        const filteredResults = enrichedResults
          .filter((place) => place.elevation !== null && place.elevation <= 200)
          .slice(0, 10); // Limit to 10 results

        if (filteredResults.length > 0) {
          setSuggestions(filteredResults);
        } else {
          setError("No places found within 200 meters of sea level.");
        }
      } else {
        setError("City not found. Please try another search.");
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1>Low-Altitude City Finder</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={city}
          className="text-black"
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
      {suggestions.length > 0 && (
        <div>
          <h2>Low-Altitude Suggestions:</h2>
          <ul>
            {suggestions.map((place, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>{place.name}</strong> - {place.country} <br />
                Latitude: {place.latitude}, Longitude: {place.longitude} <br />
                Elevation: {place.elevation} meters
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
