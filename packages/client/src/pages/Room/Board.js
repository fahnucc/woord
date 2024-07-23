import React, { useState, useEffect } from "react";
import Letter from "./Letter";

const Board = ({ board, onWordChange, onWordSelect }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsMouseDown(false);
      if (selectedLetters.length >= 3) {
        const word = selectedLetters.map((sl) => sl.letter).join("");
        const { row, col } = selectedLetters[0];
        onWordSelect(word, row, col);
      }
      setSelectedLetters([]);
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selectedLetters, onWordSelect]);

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
        const word = selectedLetters
          .map((sl) => sl.letter)
          .join("")
          .concat(board[rowIndex][colIndex]);
        onWordChange(word);
        setSelectedLetters([
          ...selectedLetters,
          { letter: board[rowIndex][colIndex], row: rowIndex, col: colIndex },
        ]);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-4 gap-2 w-80 h-80 bg-gray-300 p-4 rounded-lg">
        {board.map((row, rowIndex) =>
          row.map((letter, colIndex) => (
            <Letter
              key={`${rowIndex}-${colIndex}`}
              letter={letter}
              isSelected={selectedLetters.some(
                (sl) => sl.row === rowIndex && sl.col === colIndex
              )}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
