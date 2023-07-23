import React from "react";

const Card = ({ children, backgroundColor }) => {
  return (
    <div
      className="glass mt-4 mb-2 p-3"
      style={{ background: `rgba(${backgroundColor}, 0.23)` }}
      data-aos="fade-right"
    >
      {children}
    </div>
  );
};

export default Card;
