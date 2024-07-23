import React from "react";

const Letter = ({ letter, isSelected, onMouseDown, onMouseEnter }) => {
  return (
    <div
      className={`flex items-center justify-center bg-white border border-gray-400 rounded-lg ${
        isSelected ? "bg-yellow-300" : ""
      }`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md select-none">
        {letter}
      </div>
    </div>
  );
};

export default Letter;
