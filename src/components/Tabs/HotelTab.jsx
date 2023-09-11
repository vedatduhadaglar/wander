import React from "react";
import { TabPanel } from "@chakra-ui/react";
import Card from "../Card";

const HotelTab = () => {
  return (
    <TabPanel>
      <Card>
        <h1 className="red_gradient">Hotel Booking</h1>
        <p>Soon you will be able to book hotels from here! 😀</p>
      </Card>
    </TabPanel>
  );
};
export default HotelTab;
