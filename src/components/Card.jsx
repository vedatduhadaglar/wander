import React from "react";

const Card = ({ children }) => {
  return <div className="glass mt-4 mb-2 p-3">{children}</div>;
};

export default Card;

// export default Card;
// import React from "react";
// const Card = ({ message, isLastCard }) => {
//   return (
//     <div className="glass mt-4 mb-2 p-3">
//       {message.split("\n").map((line, lineIndex) => (
//         <p
//           key={lineIndex}
//           className={
//             lineIndex === 0
//               ? isLastCard
//                 ? "font-bold text-green-500 mb-2 text-lg"
//                 : "blue_gradient mb-2 text-lg"
//               : "mb-2"
//           }
//         >
//           {isLastCard ? line.replace("-", "💸") : line.replace("-", "🎈")}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default Card;
