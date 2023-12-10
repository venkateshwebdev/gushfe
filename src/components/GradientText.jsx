import React from "react";

const GradientText = (props) => {
  const { text } = props;
  return (
    <h1
      className={`text-5xl text-center font-bold text-transparent 
         w-3/4
         pb-3
       bg-clip-text bg-gradient-to-r from-sky-500 via-white to-sky-500`}
    >
      {text}
    </h1>
  );
};

export default GradientText;
