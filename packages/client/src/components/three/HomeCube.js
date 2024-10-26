import React from "react";
import { Text } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

const HomeCube = ({
  id,
  position,
  letter,
  isSelected,
  onMouseEnter,
  onClick,
}) => {
  const { scale } = useSpring({
    scale: isSelected ? 1.1 : 1,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const handlePointerEnter = (e) => {
    e.stopPropagation();
    onMouseEnter();
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <animated.mesh
      position={position}
      scale={scale}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
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

export default HomeCube;
