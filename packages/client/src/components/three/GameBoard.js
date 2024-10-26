import React, { useState, useCallback, useEffect } from "react";
import {
  CameraControls,
  OrthographicCamera,
  Line,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import { createCubesPositionsAndLetters } from "../../utils/boardUtils";

const GameBoard = ({ board, onWordSelect, scale = [1, 1, 1] }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleWordSelect = useCallback(() => {
    if (selectedLetters.length >= 3) {
      const word = selectedLetters.map((sl) => sl.letter).join("");
      const startRow = selectedLetters[0].row;
      const startCol = selectedLetters[0].col;
      onWordSelect(word, startRow, startCol);
    }
    setSelectedLetters([]);
  }, [selectedLetters]);

  const handleMouseDown = (cube) => {
    setIsMouseDown(true);
    setSelectedLetters([cube]);
  };

  const handleMouseEnter = (cube) => {
    if (isMouseDown) {
      const lastSelected = selectedLetters[selectedLetters.length - 1];
      if (
        lastSelected &&
        !selectedLetters.find((sl) => sl.id === cube.id) &&
        Math.abs(lastSelected.row - cube.row) <= 1 &&
        Math.abs(lastSelected.col - cube.col) <= 1
      ) {
        const newSelectedLetters = [...selectedLetters, cube];
        setSelectedLetters(newSelectedLetters);
      }
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsMouseDown(false);
      handleWordSelect();
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleWordSelect]);

  const createCubes = useCallback(
    () => createCubesPositionsAndLetters(board),
    [board]
  );
  const cubes = createCubes();
  const linePoints = selectedLetters.map((letter) => letter.position);

  return (
    <Canvas>
      {/* <CameraControls /> */}
      {/* <OrthographicCamera
        makeDefault
        zoom={50}
        position={[0, 1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      /> */}
      <PerspectiveCamera
        makeDefault
        position={[0, 15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <ambientLight intensity={2} />
      <directionalLight position={[0, 15, 0]} intensity={2} />
      <group scale={scale}>
        {cubes.map((cube, idx) => (
          <Cube
            key={idx}
            id={cube.id}
            position={cube.position}
            letter={cube.letter}
            selectedLetters={selectedLetters}
            onMouseDown={() => handleMouseDown(cube)}
            onMouseEnter={() => handleMouseEnter(cube)}
          />
        ))}
        {selectedLetters.length > 1 && (
          <Line points={linePoints} color="red" lineWidth={10} />
        )}
      </group>
    </Canvas>
  );
};

export default GameBoard;
