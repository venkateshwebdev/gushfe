import React from "react";

const ArrowButton = (props) => {
  const { text, onClick, danger, success } = props;
  return (
    <div
      onClick={onClick}
      className={`group self-end cursor-pointer text-center rounded-lg border border-transparent px-8 py-4 transition-colors hover:border-gray-600 ${
        danger ? "border-red-500/50 hover:border-red-500/80" : ""
      }
      ${success ? "border-green-300/50 hover:border-green-300/80" : ""}
      border-gray-800 hover:bg-gray-100  hover:dark:bg-neutral-800/30`}
    >
      <h2 className={` text-lg font-semibold text-center`}>
        {text}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
    </div>
  );
};

export default ArrowButton;
