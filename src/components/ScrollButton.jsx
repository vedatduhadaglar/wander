import React, { useState, useEffect } from "react";
import { upArrow } from "../assets";
const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      className={`scroll-button ${showButton ? "fade-in" : "fade-out"}`}
    >
      <img src={upArrow}></img>
    </button>
  );
};

export default ScrollButton;
