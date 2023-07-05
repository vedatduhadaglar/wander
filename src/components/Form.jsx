import React, { useState, useEffect, useRef } from "react";
import { getCityImage, getTravelPlan } from "../utils/api";
import { parseCityName } from "../utils/util";
import { Autocomplete } from "@react-google-maps/api";
import { message } from "antd";

const Form = () => {
  const [searchValue, setSearchValue] = useState("");
  const [oldValue, setOldValue] = useState("");
  const autocompleteRef = useRef(null);
  const [durationValue, setDurationValue] = useState("");

  const [responseMessage, setResponseMessage] = useState("");
  const [cityImage, setCityImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);

  console.log(searchValue);

  const dayMessages = responseMessage.split("\n\n");

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

  const handleButtonClick = () => {
    setOldValue(searchValue);
    setLoading(true);
    setResponseMessage("");
    setCityImage("");
    Promise.all([
      getTravelPlan(durationValue, searchValue, setResponseMessage),
      getCityImage(searchValue, setCityImage),
    ])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
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
              className="url_input peer"
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
            className="url_input peer"
          />
        </div>
      </div>

      <button
        type="submit"
        className={
          loading ? "w-full gray_btn bg-pink-200" : "w-full gray_btn bg-white"
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

      {isResultReady && (
        <div className="result">
          <div className="mt-4 relative">
            <img
              src={cityImage}
              alt="City"
              className="max-w-full w-full  h-64 object-fill rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="image_text">{parseCityName(oldValue)}</div>
            </div>
          </div>

          {dayMessages.length > 1 &&
            dayMessages.map((message, index) => (
              <div className="glass mt-4 mb-2 p-3" key={index}>
                {message.split("\n").map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className={lineIndex === 0 ? "blue_gradient mb-2" : "mb-2"}
                  >
                    {line.replace("-", "🎈")}
                  </p>
                ))}
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Form;
