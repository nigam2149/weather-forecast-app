import { useState, useEffect } from "react";
import "./InfoBox.css";

export default function InfoBox({ info, loading, error }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setIsVisible(true);
    return () => clearInterval(timer);
  }, []);

  const defaultInfo = {
    temp: 25.05,
    tempMin: 22.05,
    tempMax: 28.05,
    humidity: 47,
    feelsLike: 24.84,
    weather: "haze",
    city: "Delhi",
    pressure: 1013,
    windSpeed: 3.5
  };

  const displayInfo = info || defaultInfo;

  const weatherImages = {
    default: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
    haze: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&q=80",
    fog: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&q=80",
    mist: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&q=80",
    rain: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&q=80",
    drizzle: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?w=800&q=80",
    clouds: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?w=800&q=80",
    clear: "https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=800&q=80",
    snow: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80",
    thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80"
  };

  const getWeatherImage = (weather) => {
    const weatherLower = weather.toLowerCase();
    for (let key in weatherImages) {
      if (weatherLower.includes(key)) {
        return weatherImages[key];
      }
    }
    return weatherImages.default;
  };

  const getWeatherEmoji = (weather) => {
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes("rain") || weatherLower.includes("drizzle")) return "🌧️";
    if (weatherLower.includes("cloud")) return "☁️";
    if (weatherLower.includes("clear") || weatherLower.includes("sunny")) return "☀️";
    if (weatherLower.includes("snow")) return "❄️";
    if (weatherLower.includes("thunder")) return "⛈️";
    if (weatherLower.includes("fog") || weatherLower.includes("mist") || weatherLower.includes("haze")) return "🌫️";
    return "🌤️";
  };

  const getWeatherGradient = (weather) => {
    const weatherLower = weather.toLowerCase();
    if (weatherLower.includes("rain")) return "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    if (weatherLower.includes("clear")) return "linear-gradient(135deg, #fa709a 0%, #fee140 100%)";
    if (weatherLower.includes("cloud")) return "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)";
    if (weatherLower.includes("snow")) return "linear-gradient(135deg, #e0e7ff 0%, #cfd9df 100%)";
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  };

  if (error) {
    return (
      <div className="info-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Oops! City Not Found</h2>
          <p>{error}</p>
          <p className="error-hint">Try searching for another city</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="info-container">
        <div className="loading-box">
          <div className="spinner"></div>
          <p className="loading-text">🌍 Fetching weather data...</p>
          <p className="loading-hint">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="info-container">
      <div className={`weather-card ${isVisible ? 'visible' : ''}`}>
        <div 
          className="card-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.5)), url(${getWeatherImage(displayInfo.weather)})`
          }}
        >
          <div className="header-top">
            <div className="time-badge">
              <div className="time">
                ⏰ {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="date">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
          
          <div className="header-bottom">
            <div className="city-badge">
              <div className="weather-emoji-large">
                {getWeatherEmoji(displayInfo.weather)}
              </div>
              <h2 className="city-name">{displayInfo.city}</h2>
              <p className="weather-description">{displayInfo.weather}</p>
            </div>
          </div>
        </div>
        
        <div className="card-body">
          <div 
            className="main-temperature"
            style={{ background: getWeatherGradient(displayInfo.weather) }}
          >
            {Math.round(displayInfo.temp)}°C
          </div>
          
          <p className="feels-like">
            Feels like {Math.round(displayInfo.feelsLike)}°C
          </p>
          
          <div className="stats-grid">
            <div className="stat-card min-temp">
              <p className="stat-label">🌡️ Min Temp</p>
              <p className="stat-value">{Math.round(displayInfo.tempMin)}°C</p>
            </div>
            
            <div className="stat-card max-temp">
              <p className="stat-label">🌡️ Max Temp</p>
              <p className="stat-value">{Math.round(displayInfo.tempMax)}°C</p>
            </div>
            
            <div className="stat-card humidity-card">
              <p className="stat-label">💧 Humidity</p>
              <p className="stat-value">{displayInfo.humidity}%</p>
            </div>
            
            <div className="stat-card wind-card">
              <p className="stat-label">💨 Wind Speed</p>
              <p className="stat-value">
                {displayInfo.windSpeed ? `${displayInfo.windSpeed} m/s` : "N/A"}
              </p>
            </div>
          </div>

          <div className="pressure-box">
            <div className="pressure-item">
              <div className="pressure-label">🌡️ Pressure</div>
              <div className="pressure-value">{displayInfo.pressure} hPa</div>
            </div>
          </div>

          <div className="update-badge">
            ✨ Last Updated: {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}