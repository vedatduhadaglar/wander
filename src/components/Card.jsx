import React from "react";

const Card = ({ message }) => {
  return (
    <div className="glass mt-4 mb-2 p-3">
      {message.split("\n").map((line, lineIndex) => (
        <p
          key={lineIndex}
          className={lineIndex === 0 ? "blue_gradient mb-2 text-lg" : "mb-2"}
        >
          {line.replace("-", "🎈")}
        </p>
      ))}
    </div>
  );
};

export default Card;
