"use client";
import React, { useState, useEffect } from 'react';
import './mars.css';
import NextImage from 'next/image';
// Import necessary modules and styles

// Define interfaces for your API responses
interface WeatherData {
  temperature: {
    average?: number;
  };
  wind: {
    average?: number;
  };
  pressure: {
    average?: number;
  };
}

interface WeatherResponse {
  marsWeather: Record<string, WeatherData>;
}

interface PhotosResponse {
  marsPhotos: string[];
}

const MarsData = () => {
  const [weather, setWeather] = useState<Record<string, WeatherData> | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [apiLimits, setApiLimits] = useState<{ limit: number; remaining: number } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('http://localhost:3001/weather');
        const data = (await response.json()) as WeatherResponse;
        setWeather(data.marsWeather);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch('http://localhost:3001/photos');
        const data = (await response.json()) as PhotosResponse;
        setPhotos(data.marsPhotos || []);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    const fetchApiLimits = async () => {
      try {
        const response = await fetch('http://localhost:3001/api-limits');
        const data = await response.json();
        setApiLimits(data);
      } catch (error) {
        console.error('Error fetching API limits:', error);
      }
    };

    fetchWeather();
    fetchPhotos();
    fetchApiLimits();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Mars Today</h1>
        <p>InSight Weather & Curiosity Photos</p>
        {apiLimits && (
          <div className="api-limits">
            <p>API Calls Remaining: {apiLimits.remaining} / {apiLimits.limit}</p>
          </div>
        )}
      </header>
      <main>
        <section id="weather">
          <h2>Latest Weather on Mars</h2>
          {weather ? (
            <div className="weather-grid">
              {Object.entries(weather).map(([sol, data]) => (
                <div key={sol} className="weather-sol">
                  <h3>Sol {sol.replace('sol', '')}</h3>
                  <p>Temperature (Avg): {data.temperature.average?.toFixed(2)}°C</p>
                  <p>Wind (Avg): {data.wind.average?.toFixed(2)} m/s</p>
                  <p>Pressure (Avg): {data.pressure.average?.toFixed(2)} Pa</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading weather data...</p>
          )}
        </section>
        <section id="photos">
          <h2>Photos from Curiosity</h2>
          {photos.length > 0 ? (
            <div className="photo-grid">
              {photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Mars photo ${index + 1}`} />
              ))}
            </div>
          ) : (
            <p>Loading photos...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default MarsData;
