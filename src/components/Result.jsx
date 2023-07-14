import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Card from "./Card";

const Result = ({
  cityImage,
  destinationName,
  activeTab,
  handleTabChange,
  dayMessages,
}) => {
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
        <TabList className="mx-auto" width={"75%"} justifyContent={"center"}>
          <Tab>
            {/* {balloonIcon} */}
            {<b>✈️ Travel</b>}
          </Tab>
          <Tab>
            {/* {weatherIcon} */}
            {<b>⛈️ Weather</b>}
          </Tab>
          <Tab>
            {/* {hotelIcon} */}
            {<b>🏨 Hotels</b>}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Conditionally render content based on activeTab */}
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
                <h1 className="orange_gradient text-lg mb-64">
                  Daily Weather Display
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
