import React, { useState, useEffect } from "react";
import { TabPanel } from "@chakra-ui/react";
import { weather } from "../../assets";
import Card from "../Card";
import { fetchWeatherForecast } from "../../utils/api";
import { useTab } from "@chakra-ui/react";

const WeatherTab = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchWeatherForecast()
      .then((data) => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching weather forecast:", error);
        setIsLoading(false);
      });
  }, []); // The empty dependency array ensures this effect runs only once on component mount.
  console.log(weatherData);
  return (
    <TabPanel>
      <Card>
        <h1 className="lavender_gradient text-lg mb-64 flex items-center gap-2">
          <img
            className="mb-1"
            src={weather}
            style={{
              width: "30px",
              height: "30px",
            }}
            alt="Weather Icon"
          />
          Daily Weather Display
        </h1>
      </Card>
    </TabPanel>
  );
};

export default WeatherTab;
