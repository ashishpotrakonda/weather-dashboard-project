import "./styles.css";

import { useState } from "react";

export default function App() {
  let [displayWeatherCard, modifyDisplayWeatherCard] = useState(false);
  let [searchField, modifySearchField] = useState("");
  let [temp, modifyTemp] = useState(0);
  let [humidity, modifyHumidity] = useState(0);
  let onChangeSearchField = (event) => {
    modifySearchField(event.target.value);
  };
  let fetchLatitudeLongitude = async () => {
    let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${searchField}&limit=5&appid=0dc131c30d1501ff3c93a9d18701efa3`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    let latitude = data[0].lat;
    let longitude = data[0].lon;
    let weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0dc131c30d1501ff3c93a9d18701efa3`
    );
    let weatherData = await weatherResponse.json();
    modifyTemp(weatherData.main.temp);
    modifyHumidity(weatherData.main.humidity);
    modifyDisplayWeatherCard(true);
  };
  let onClickSearchButton = () => {
    fetchLatitudeLongitude();
  };
  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <input
        placeholder="Search Your City"
        value={searchField}
        onChange={onChangeSearchField}
        className="input-field"
      />
      <button className="search-button" onClick={onClickSearchButton}>
        Search
      </button>
      {displayWeatherCard && (
        <div className="weather-card">
          <h1>Temperature: {temp}</h1>
          <h1>Humidity: {humidity}</h1>
        </div>
      )}
    </div>
  );
}
