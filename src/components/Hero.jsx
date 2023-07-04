import React from "react";

import { logo, github } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-11/12 mb-6 pt-3 sm:mb-3">
        <a href="">
          <div className="flex justify items-center">
            <img
              src={logo}
              alt="logo"
              className="w-20 md:w-28 sm:w-18 object-contain"
            />
            <div className="logo_text ">
              wander<span className="blue_gradient ">.ai</span>
            </div>
          </div>
        </a>

        <a href="https://github.com/vedatduhadaglar" target="_blank">
          <img
            src={github}
            className="w-7 h-7 sm:w-8 sm:h-8 transition-transform transform-gpu hover:scale-125 cursor-pointer"
            alt="GitHub"
          />
        </a>
      </nav>

      <h1 className="head_text">
        Plan Your Journey🗺️ <br className="max-md:hidden" />
        <span className="blue_gradient ">Using OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Say goodbye to hours of research and let Wander do the work for you,
        providing you with clear and comprehensive travel itineraries that fit
        your preferences. Built by Vedat Daglar.
      </h2>
    </header>
  );
};

export default Hero;
