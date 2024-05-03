import React, { useState } from 'react';
import axios from 'axios';
import { FaCloud, FaTemperatureHigh, FaThermometerHalf, FaTint, FaWind, FaSun, FaMoon } from 'react-icons/fa';
import '../css/Weather.css'; 

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
        headers: {
          'X-Api-Key': 'g8G0uCP3NsxZZDgMSHC3CA==Th7wHiv5tcuigdll'
        }
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  // Update current time every second
  setInterval(() => {
    setCurrentTime(new Date());
  }, 1000);

  return (
    <div className="weather-container">
      <h2 className="heading">Weather Information</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      {weatherData && (
        <div className="weather-info">
          <h3>Weather for {city}</h3>
          <div><FaCloud /> Cloud Percentage: {weatherData.cloud_pct}</div>
          <div><FaTemperatureHigh /> Temperature: {weatherData.temp}°C</div>
          <div><FaThermometerHalf /> Feels Like: {weatherData.feels_like}°C</div>
          <div><FaTint /> Humidity: {weatherData.humidity}%</div>
          <div><FaWind /> Wind Speed: {weatherData.wind_speed} m/s</div>
          <div><FaSun /> Sunrise: {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}</div>
          <div><FaMoon /> Sunset: {new Date(weatherData.sunset * 1000).toLocaleTimeString()}</div>
          <div>Current Time: {currentTime.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
};

export default Weather;
