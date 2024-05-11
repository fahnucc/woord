import React, { useState, useEffect } from "react";

const Board = ({ board, onWordSelect }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (!isMouseDown && selectedLetters.length > 0) {
      if (selectedLetters.length >= 3) {
        const word = selectedLetters.map((sl) => sl.letter).join("");
        const { row, col } = selectedLetters[0];
        onWordSelect(word, row, col);
      }
      setSelectedLetters([]);
    }
  }, [isMouseDown, selectedLetters, onWordSelect]);

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsMouseDown(true);
    setSelectedLetters([
      { letter: board[rowIndex][colIndex], row: rowIndex, col: colIndex },
    ]);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isMouseDown) {
      const lastSelected = selectedLetters[selectedLetters.length - 1];
      if (
        Math.abs(lastSelected.row - rowIndex) <= 1 &&
        Math.abs(lastSelected.col - colIndex) <= 1 &&
        !selectedLetters.some(
          (sl) => sl.row === rowIndex && sl.col === colIndex
        )
      ) {
        setSelectedLetters([
          ...selectedLetters,
          { letter: board[rowIndex][colIndex], row: rowIndex, col: colIndex },
        ]);
      }
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="grid grid-cols-4 gap-2 w-80 h-80 bg-gray-300 p-4 rounded-lg"
        onMouseLeave={handleMouseUp}
      >
        {board.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`flex items-center justify-center bg-white border border-gray-400 rounded-lg ${
                selectedLetters.some(
                  (sl) => sl.row === rowIndex && sl.col === colIndex
                )
                  ? "bg-yellow-300"
                  : ""
              }`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleMouseUp}
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
