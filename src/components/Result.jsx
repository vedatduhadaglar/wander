import React from "react";
import { Tabs, TabList, TabPanels, Tab } from "@chakra-ui/react";
import ScrollButton from "./ScrollButton";
import TravelTab from "./Tabs/TravelTab";
import WeatherTab from "./Tabs/WeatherTab";
import HotelTab from "./Tabs/HotelTab";
const Result = ({ cityImage, destinationName, dayMessages }) => {
  return (
    <section className="fade">
      {/* Places Image Display */}
      <div className="mt-4 mb-6 relative">
        <img
          src={cityImage}
          alt="City"
          className="max-w-full w-full  h-64 object-fill rounded"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="image_text">{destinationName}</div>
        </div>
      </div>

      <Tabs>
        <TabList
          className="mx-auto"
          width={"80%"}
          justifyContent={"center"}
          gap={"1rem"}
        >
          <Tab>{<b>✈️ Travel</b>}</Tab>
          <Tab>{<b>🌦️ Weather</b>}</Tab>
          <Tab>{<b>🏨 Hotels</b>}</Tab>
        </TabList>

        <TabPanels>
          <TravelTab dayMessages={dayMessages} />
          <WeatherTab destination={destinationName} />
          <HotelTab />
        </TabPanels>
      </Tabs>
      <ScrollButton />
    </section>
  );
};

export default Result;
