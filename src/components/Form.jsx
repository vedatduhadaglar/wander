import React, { useState, useEffect, useRef } from "react";
import { handleAPI } from "../utils/api";
import { Autocomplete } from "@react-google-maps/api";
import LocationAutocomplete from "./AutoComplete";
import SubmitButton from "./SubmitButton";
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

  const dayMessages = responseMessage.split("\n\n");
  const toast = useToast();

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
          <LocationAutocomplete
            searchValue={searchValue}
            handleSearchChange={handleSearchChange}
            handlePlaceSelect={handlePlaceSelect}
            autocompleteRef={autocompleteRef}
          />
        </div>

        <div className="relative flex justify-center items-center w-4/12 sm:w-3/12">
          <input
            type="number"
            min={1}
            max={7}
            placeholder=" Days 🕑"
            required
            onChange={handleDurationChange}
            className="input_styles"
          />
        </div>
      </div>

      <SubmitButton loading={loading} handleButtonClick={handleButtonClick} />
      {errorOccurred && (
        <div className="glass rounded mt-4 mb-2">
          <img className="fade w-full" src={errorGif}></img>
        </div>
      )}

      {isResultReady && (
        <Result
          cityImage={cityImage}
          destinationName={destinationName}
          durationValue={durationValue}
          dayMessages={dayMessages}
        />
      )}
    </section>
  );
};

export default Form;
