import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const getRotateValue = () => {
  const rotate = Math.random() > 0.5 ? 15 : -15;
  return rotate;
};

const Letter = ({ letter, isSelected, onMouseDown, onMouseEnter }) => {
  const [springs, api] = useSpring(() => ({}));

  useEffect(() => {
    if (isSelected) {
      const rotate = getRotateValue();
      api.start({
        from: { rotate: 0, background: "white", scale: 1 },
        to: [
          { rotate, background: "yellow", scale: 1.05 },
          { rotate: -rotate, scale: 1.1 },
          { rotate: 0, scale: 1 },
        ],
        config: { duration: 100 },
      });
    } else {
      api.start({
        to: { rotate: 0, background: "white", scale: 1 },
        config: { duration: 1000 },
      });
    }
  }, [isSelected, api]);

  return (
    <animated.div
      className={`flex items-center justify-center bg-white border border-gray-400 rounded-lg`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      style={{ ...springs }}
    >
      <div className="flex items-center justify-center select-none">
        {letter}
      </div>
    </animated.div>
  );
};

export default Letter;
