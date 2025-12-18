import { useState } from "react";
import "./SearchBox.css";

export default function SearchBox({ onWeatherUpdate, loading }) {
  const [city, setCity] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onWeatherUpdate(city);
      setCity("");
    }
  };

  return (
    <div className="search-container">
      <div className="pattern-bg"></div>
      
      <div className="search-content">
        <div className="floating-cloud">
          <div className="cloud-icon">☁️</div>
        </div>
        
        <h1 className="main-title">Weather Forecast</h1>
        
        <p className="subtitle">
          Real-time weather updates • Worldwide coverage • Live data
        </p>
        
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search any city... (Mumbai, Tokyo, Paris)"
            required
            value={city}
            onChange={handleChange}
            disabled={loading}
          />
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className={`search-button ${loading ? 'loading' : ''}`}
          >
            {loading ? "⏳ Searching..." : "🔍 Search"}
          </button>
        </div>
      </div>
    </div>
  );
}