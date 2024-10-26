import React from "react";
import { Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { getRotateDirection } from "../../utils/boardUtils";

const Cube = ({
  id,
  position,
  letter,
  selectedLetters,
  onMouseDown,
  onMouseEnter,
}) => {
  const isSelected = selectedLetters.some((sl) => sl.id === id);
  const isLastSelected = selectedLetters[selectedLetters.length - 2]?.id === id;

  const { up, down, left, right } = getRotateDirection(id, selectedLetters);
  const { rotation } = useSpring({
    rotation: isLastSelected
      ? [
          up ? -Math.PI / 20 : down ? Math.PI / 20 : 0,
          0,
          left ? Math.PI / 20 : right ? -Math.PI / 20 : 0,
        ]
      : [0, 0, 0],
    config: { mass: 10, tension: 500, friction: 10, precision: 0.01 },
    loop: { reverse: true },
    onRest: () => {
      rotation.start([0, 0, 0]);
    },
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    onMouseDown();
  };

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    onMouseEnter();
  };

  return (
    <animated.mesh
      position={position}
      rotation={rotation}
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
    >
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial color={isSelected ? "yellow" : "white"} />
      <Text
        position={[0, 0.51, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        color="black"
        anchorX="center"
        anchorY="middle"
        fontSize={0.7}
      >
        {letter}
      </Text>
    </animated.mesh>
  );
};

export default Cube;
