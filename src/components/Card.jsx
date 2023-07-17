import React from "react";

const Card = ({ children }) => {
  return (
    <div className="glass mt-4 mb-2 p-3" data-aos="fade-right">
      {children}
    </div>
  );
};

export default Card;
