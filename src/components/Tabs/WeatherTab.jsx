import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    handleFetchWeather();
  }, [destination]);

  return (
    <TabPanel>
      <div className="flex items-center justify-center gap-2">
        <img
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
      <div className="card-container ">
        {forecast.map((item, index) => (
          <Card key={index} backgroundColor={"0,0,255"}>
            <div className="p-2 flex justify-around items-center gap-6 mb-2 ">
              <span className=" font-bold whitespace-nowrap ">
                Day {index + 1}
              </span>
              <img
                src={`https://openweathermap.org/img/wn/${item.iconCode}.png`}
                alt="Weather Icon"
                style={{
                  width: "60px",
                  height: "100%",
                }}
              />
              <span className="whitespace-nowrap ">{`${item.weather.replace(
                /\b\w/g,
                (char) => char.toUpperCase()
              )} ${item.temp}°C`}</span>
              <span> {item.wind} km/h</span>
            </div>
          </Card>
        ))}
      </div>
    </TabPanel>
  );
};

export default WeatherTab;
