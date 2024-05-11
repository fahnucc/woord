import React from "react";

const Board = ({ board }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-4 gap-2 w-80 h-80 bg-gray-300 p-4 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center bg-white border border-gray-400 rounded-lg"
            >
              <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md select-none">
                {letter}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
