import React from "react";

import { github, balloon } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-10/12 mb-8 pt-3 mt-6 sm:mb-3">
        <a href="">
          <div className="flex justify items-center gap-2">
            <img
              src={balloon}
              alt="logo"
              className="w-10 md:w-10 sm:w-10 object-contain"
            />

            <div className="logo_text ">
              wander<span className="blue_gradient hide"></span>
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

      <h1 className="head_text text-justify">
        Plan Your Journey<span className="hide ml-1">🗺️</span>{" "}
        <br className="max-md:hidden" />
        <span className="blue_gradient ">Using OpenAI GPT-4</span>
      </h1>
      <h2 className="desc text-justify">
        Say goodbye to hours of research and let Wander do the work for you,
        providing you with clear and comprehensive travel itineraries that fit
        your preferences.
      </h2>
    </header>
  );
};

export default Hero;
