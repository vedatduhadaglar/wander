import React from "react";
import { TabPanel } from "@chakra-ui/react";
import Card from "../Card";

const HotelTab = () => {
  return (
    <TabPanel>
      <Card>
        <h1 className="red_gradient">Hotel Booking</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </Card>
    </TabPanel>
  );
};
export default HotelTab;
