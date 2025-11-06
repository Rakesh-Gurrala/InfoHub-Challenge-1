import { useState } from "react";
import { fetchWeather as fetchWeatherApi } from "../api";

function WeatherModule() {
  const [city, setCity] = useState("London");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchWeatherApi(city);
      setData(response.data);
    } catch {
      setError("Could not fetch weather data.");
      setData(null);
    }
    setLoading(false);
  };

  


  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">🌦️ Weather Information</h2>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg inline-block">
          <h3 className="text-xl font-semibold mb-2">
            Weather in {data.city}
          </h3>
          <p className="text-lg">Temperature: {data.temperature}°C</p>
          <p className="capitalize mb-2">Condition: {data.condition}</p>
          {data.icon && (
            <img
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              alt={data.condition}
              className="mx-auto"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherModule;
