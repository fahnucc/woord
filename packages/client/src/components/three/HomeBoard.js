import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Line } from "@react-three/drei";
import HomeCube from "./HomeCube";
import {
  getHomeBoard,
  createCubesPositionsAndLetters,
} from "../../utils/boardUtils";

const rowWordMap = {
  0: "HOME",
  1: "PLAY",
  2: "ROOMLIST",
  3: "ROOMLIST",
};

const HomeBoard = ({ scale = [1, 1, 1], onWordClick }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const timeouts = useRef([]);
  const board = getHomeBoard();
  const cubes = createCubesPositionsAndLetters(board);

  const handleMouseEnter = (row) => {
    let letters = cubes.filter((cube) => cube.row === row);
    if (row === 2 || row === 3) {
      const row2 = cubes.filter((cube) => cube.row === 2);
      const row3 = cubes.filter((cube) => cube.row === 3);
      letters = [...row2, ...row3.reverse()];
    }

    setSelectedLetters([]);
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    letters.forEach((letter, index) => {
      const timeout = setTimeout(() => {
        setSelectedLetters((prevSelected) => [...prevSelected, letter]);
      }, index * 100);
      timeouts.current.push(timeout);
    });
  };

  useEffect(() => {
    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const linePoints = selectedLetters.map((letter) => letter.position);

  return (
    <Canvas
      style={{
        width: `480px`,
        height: `480px`,
      }}
    >
      <PerspectiveCamera
        makeDefault
        position={[0, 15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <ambientLight intensity={2} />
      <directionalLight position={[0, 15, 0]} intensity={2} />
      <group scale={scale}>
        {cubes.map((cube, idx) => (
          <HomeCube
            key={idx}
            id={cube.id}
            position={cube.position}
            letter={cube.letter}
            isSelected={selectedLetters.some((sl) => sl.id === cube.id)}
            onMouseEnter={() => handleMouseEnter(cube.row)}
            onClick={() => onWordClick?.(rowWordMap[cube.row])}
          />
        ))}
        {selectedLetters.length > 1 && (
          <Line points={linePoints} color="red" lineWidth={10} />
        )}
      </group>
    </Canvas>
  );
};

export default HomeBoard;
