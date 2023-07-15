import React from "react";
import { TabPanel } from "@chakra-ui/react";
import Card from "../Card";

const TravelTab = ({ dayMessages }) => {
  return (
    <TabPanel>
      {dayMessages.length > 1 &&
        dayMessages.map((message, index) => (
          <Card key={index}>
            {message.split("\n").map((line, lineIndex) => (
              <p
                key={lineIndex}
                className={
                  lineIndex === 0
                    ? index === dayMessages.length - 1 // Check if it's the last card
                      ? "font-bold text-green-500 mb-2 text-lg"
                      : "blue_gradient mb-2 text-lg"
                    : "mb-2"
                }
              >
                {index === dayMessages.length - 1
                  ? line.replace("-", "💸")
                  : line.replace("-", "🎈")}
              </p>
            ))}
          </Card>
        ))}
    </TabPanel>
  );
};

export default TravelTab;
