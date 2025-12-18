import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";

export default function App() {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_url = "https://api.openweathermap.org/data/2.5/weather";
  const api_key = "ecb7a25ab29274a274065389e5a2f4f8";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${api_url}?q=${city}&appid=${api_key}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error("City not found. Please check the spelling and try again.");
      }
      
      const jsonResponse = await response.json();
      const result = {
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
        city: jsonResponse.name,
        pressure: jsonResponse.main.pressure,
        windSpeed: jsonResponse.wind.speed,
        visibility: jsonResponse.visibility
      };
      
      setWeatherInfo(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <SearchBox onWeatherUpdate={fetchWeather} loading={loading} />
      <InfoBox info={weatherInfo} loading={loading} error={error} />
    </div>
  );
}