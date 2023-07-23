import React, { useState } from "react";
import { TabPanel } from "@chakra-ui/react";
import { weather } from "../../assets";
import Card from "../Card";
import { fetchWeatherForecast } from "../../utils/api";

const WeatherTab = ({ destination }) => {
  const [forecast, setForecast] = useState([]);

  const handleFetchWeather = async () => {
    const data = await fetchWeatherForecast(destination, 3);
    setForecast(data);
  };

  return (
    <TabPanel>
      <div className="flex items-center justify-center gap-2">
        <img
          className="mb-1"
          src={weather}
          style={{
            width: "30px",
            height: "30px",
          }}
          alt="Weather Icon"
        />
        <h1 className="lavender_gradient text-lg  text-center">
          Daily Weather Display
        </h1>
      </div>
      <div className="card-container">
        {forecast.map((item, index) => (
          <Card key={index} backgroundColor={"0,0,255"}>
            <p className="font-bold">Day {index + 1}</p>
            <div className="flex items-center gap-6">
              <img
                src={`https://openweathermap.org/img/wn/${item.iconCode}.png`}
                alt="Weather Icon"
                style={{
                  width: "60px",
                  height: "100%",
                }}
              />

              <p>{`${item.weather.replace(/\b\w/g, (char) =>
                char.toUpperCase()
              )} ${item.temp}°C`}</p>
            </div>
          </Card>
        ))}
      </div>

      <button onClick={handleFetchWeather}>Fetch Weather</button>
    </TabPanel>
  );
};

export default WeatherTab;
