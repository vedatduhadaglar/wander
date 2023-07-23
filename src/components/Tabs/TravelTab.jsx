import React from "react";
import { TabPanel } from "@chakra-ui/react";
import Card from "../Card";

// Changes colors and emojis for the travel cards and budget estimation
const formatLine = (line, index, isLastCard) => {
  const prefix = isLastCard ? "💸" : "🎈";
  return (
    <p
      key={index}
      className={`${
        index === 0
          ? isLastCard
            ? "font-bold text-green-500"
            : "blue_gradient"
          : ""
      } mb-2 text-lg`}
    >
      {line.replace("-", prefix)}
    </p>
  );
};

const TravelTab = ({ dayMessages }) => {
  return (
    <TabPanel>
      {dayMessages.length > 1 &&
        dayMessages.map((message, index) => (
          <Card key={index}>
            {message
              .split("\n")
              .map((line, lineIndex) =>
                formatLine(line, lineIndex, index === dayMessages.length - 1)
              )}
          </Card>
        ))}
    </TabPanel>
  );
};

export default TravelTab;
