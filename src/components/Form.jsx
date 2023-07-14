import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import {
  getDestination,
  getTravelPlan,
  fetchWeatherForecast,
} from "../utils/api";
import { Autocomplete } from "@react-google-maps/api";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { errorGif, balloon, weather, hotel } from "../assets";
import Result from "./Result";

const Form = () => {
  const [searchValue, setSearchValue] = useState("");
  const autocompleteRef = useRef(null);
  const [durationValue, setDurationValue] = useState("");
  const [destinationName, setDestinationName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [cityImage, setCityImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const dayMessages = responseMessage.split("\n\n");

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // When both the image and the travel plan is fetched, resultready is true
  useEffect(() => {
    if (cityImage !== "" && responseMessage !== "") {
      setIsResultReady(true);
      setLoading(false);
    } else {
      setIsResultReady(false);
    }
  }, [cityImage, responseMessage]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    setSearchValue(place.formatted_address);
  };

  const displayPopUp = () => {
    message.error("Duration cannot be more than 7 days.", 3);
  };

  const handleDurationChange = (event) => {
    event.preventDefault();
    if (event.target.value > 7) {
      event.target.value = 7;
      displayPopUp();
    }
    setDurationValue(event.target.value);
  };

  const handleButtonClick = async () => {
    if (searchValue === "") {
      console.log("Whoops, you forgot to fill in your destination 😅");
    } else if (durationValue === "") {
      console.log("Don't forget to fill in your travelling duration 😴");
    } else {
      setErrorOccurred(false);
      setLoading(true);
      setResponseMessage("");
      setCityImage("");

      // TODO: Put this in a seperate function
      try {
        const destination = await getDestination(
          searchValue,
          setDestinationName,
          setCityImage
        );
        await getTravelPlan(durationValue, destination, setResponseMessage);
        setLoading(false);
      } catch (error) {
        console.error("Error called from handlebutton", error);
        setErrorOccurred(true);
        setLoading(false);
      }
    }
  };

  return (
    <section className="mt-8 w-full max-w-xl sm:w-6/12">
      <div className="flex w-full gap-2 mb-1">
        <div className="w-full">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
              autocomplete.setFields(["formatted_address"]);
            }}
            onPlaceChanged={handlePlaceSelect}
            options={{
              types: ["(cities)"],
            }}
          >
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Where are you planning to go? ✈️"
              required
              value={searchValue}
              className="input_styles peer"
            />
          </Autocomplete>
        </div>

        <div className="relative flex justify-center items-center w-2/12 sm:w-4/12">
          <input
            type="number"
            min={1}
            max={7}
            placeholder=" Days 🕑"
            required
            onChange={handleDurationChange}
            className="input_styles peer"
          />
        </div>
      </div>

      <button
        type="submit"
        className={
          loading
            ? "w-full gray_btn bg-pink-300 border border-gray-200 "
            : "w-full gray_btn bg-white input_styles"
        }
        onClick={handleButtonClick}
      >
        {loading ? (
          <span>
            Loading...<span className="loading-emoji"></span>
          </span>
        ) : (
          "Plan Your Journey"
        )}
      </button>

      {errorOccurred && (
        <div className="glass rounded mt-4 mb-2">
          <img className="fade w-full" src={errorGif}></img>
        </div>
      )}

      {isResultReady && (
        <Result
          cityImage={cityImage}
          destinationName={destinationName}
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          dayMessages={dayMessages}
        />
      )}
    </section>
  );
};

export default Form;
