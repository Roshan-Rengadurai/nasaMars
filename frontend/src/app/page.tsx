"use client";
import React, { useState, useEffect } from "react";
import "./mars.css";


interface WeatherData {
  AT?: { av?: number; mn?: number; mx?: number };
  HWS?: { av?: number; mn?: number; mx?: number };
  PRE?: { av?: number; mn?: number; mx?: number };
  WD?: { most_common?: { compass_degrees: number; compass_point: string } };
}

interface Photo {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { name: string };
}

const MarsData = () => {
  const [weather, setWeather] = useState<Record<string, WeatherData> | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [apiLimits, setApiLimits] = useState<{ limit: number; remaining: number } | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/mars/weather");
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/mars/photos");
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    const fetchApiLimits = async () => {
      try {
        const response = await fetch("/api/mars/api-limits");
        const data = await response.json();
        setApiLimits(data);
      } catch (error) {
        console.error("Error fetching API limits:", error);
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
            <p>
              API Calls Remaining: {apiLimits.remaining} / {apiLimits.limit}
            </p>
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
                  <h3>Sol {sol.replace("sol", "")}</h3>
                  <p>Temperature (Avg): {data.AT?.av?.toFixed(2)}°C</p>
                  <p>Wind (Avg): {data.HWS?.av?.toFixed(2)} m/s</p>
                  <p>Pressure (Avg): {data.PRE?.av?.toFixed(2)} Pa</p>
                  {data.WD?.most_common && (
                    <p>Wind Direction: {data.WD.most_common.compass_point}</p>
                  )}
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
                <img key={index} src={photo.img_src} alt={`Mars photo ${index + 1}`} />
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
