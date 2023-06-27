import React, { useState, useEffect } from "react";
import { getCityImage, getTravelPlan } from "../utils/api";

const Form = () => {
  const [searchValue, setSearchValue] = useState("");
  const [durationValue, setDurationValue] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [cityImage, setCityImage] = useState("");
  const [loading, setLoading] = useState(false);
  const dayMessages = responseMessage.split("\n\n");
  const [isResultReady, setIsResultReady] = useState(false);

  useEffect(() => {
    if (cityImage !== "" && responseMessage !== "") {
      setIsResultReady(true);
      setLoading(false);
    } else {
      setIsResultReady(false);
    }
  }, [cityImage, responseMessage]);

  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleButtonClick();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDurationValue(event.target.value);
  };

  const handleButtonClick = (event) => {
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

  const parse = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return (
    <section className="mt-8 w-full max-w-xl sm:6">
      <div className="flex w-full gap-2 mb-1">
        <div className="relative flex justify-center items-center w-9/12">
          <input
            type="text"
            placeholder="Where are you planning to go? ✈️"
            required
            value={searchValue}
            onChange={handleSearchChange}
            className="url_input peer"
          />
        </div>

        <div className="relative flex justify-center items-center w-3/12">
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
          loading ? "w-full gray_btn bg-white " : "w-full gray_btn bg-white"
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
              className="max-w-full w-full blur-sm h-64 object-fill rounded"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="image_text">{parse(searchValue)}</div>
            </div>
          </div>

          {dayMessages.length > 1 &&
            dayMessages.map((message, index) => (
              <div className="glass mt-4 mb-2 p-3" key={index}>
                {message.split("\n").map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className={lineIndex === 0 ? "blue_gradient mb-2 " : "mb-2"}
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
