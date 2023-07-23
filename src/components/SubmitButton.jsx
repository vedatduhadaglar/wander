import React from "react";

const SubmitButton = ({ loading, handleButtonClick }) => {
  return (
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
  );
};

export default SubmitButton;
