import React, { useState, useEffect, useRef } from "react";
import { handleAPI } from "../utils/api";
import { Autocomplete } from "@react-google-maps/api";
import { errorGif } from "../assets";
import Result from "./Result";
import { exceedingLimitPopUp, validateForm } from "../utils/FormValidate";
import { useToast } from "@chakra-ui/react";

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
  const toast = useToast();

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

  const handleDurationChange = (event) => {
    event.preventDefault();
    if (event.target.value > 7) {
      exceedingLimitPopUp(toast);
      event.target.value = 7;
    }
    setDurationValue(event.target.value);
  };

  const handleAPIError = (error) => {
    console.error("Error called from handleAPI", error);
    setErrorOccurred(true);
    setLoading(false);
  };

  const handleButtonClick = async () => {
    setErrorOccurred(false);
    setLoading(true);
    setResponseMessage("");
    setCityImage("");

    if (validateForm(toast, searchValue, durationValue)) {
      try {
        await handleAPI(
          searchValue,
          durationValue,
          setDestinationName,
          setCityImage,
          setResponseMessage,
          setLoading,
          setErrorOccurred
        );
      } catch (error) {
        handleAPIError(error);
      }
    } else {
      setLoading(false);
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

        <div className="relative flex justify-center items-center w-5/12 sm:w-4/12">
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
