import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Card from "./Card";
import { useState, useEffect } from "react";
import { weather } from "../assets";
const Result = ({
  cityImage,
  destinationName,
  activeTab,
  handleTabChange,
  dayMessages,
}) => {
  // const [weatherFetched, setWeatherFetched] = useState(false);

  // useEffect(() => {
  //   if (activeTab === 1 && !weatherFetched) {
  //     console.log("weather");
  //     setWeatherFetched(true);
  //   }
  // }, []);

  return (
    <div className="fade">
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
      <Tabs index={activeTab} onChange={handleTabChange}>
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
          <TabPanel>
            {activeTab === 0 &&
              dayMessages.length > 1 &&
              dayMessages.map((message, index) => (
                <Card
                  message={message}
                  key={index}
                  isLastCard={index === dayMessages.length - 1}
                />
              ))}
          </TabPanel>
          <TabPanel>
            {/* Conditionally render content based on activeTab */}
            {activeTab === 1 && (
              <div className="glass mt-4 mb-2 p-3">
                <h1 className="lavender_gradient text-lg mb-64 flex items-center gap-2">
                  <img
                    className="mb-1"
                    src={weather}
                    style={{
                      width: "30px",
                      height: "30px",
                    }}
                  ></img>
                  Daily Weather Display{" "}
                </h1>
              </div>
            )}
          </TabPanel>
          <TabPanel>
            {/* Conditionally render content based on activeTab */}
            {activeTab === 2 && (
              <div className="glass mt-4 mb-2 p-3">
                <h1 className="red_gradient">Hotel Booking</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Architecto, accusamus eos! Magnam iste assumenda sapiente.
                  Modi non cum iste doloribus qui quos atque itaque
                  reprehenderit necessitatibus esse iure, veniam in? Lorem ipsum
                  dolor, sit amet consectetur adipisicing elit. Veniam labore
                  quasi adipisci sequi dignissimos cupiditate debitis? Aliquid
                  excepturi, rerum autem quam totam suscipit voluptates ratione,
                  obcaecati adipisci modi illum laborum! Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Quo inventore repellendus
                  optio, tempora soluta sit dignissimos tenetur ut odit quidem.
                  Officiis ratione laudantium non aspernatur aperiam autem est
                  saepe modi.
                </p>
              </div>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Result;
