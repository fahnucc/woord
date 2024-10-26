import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const LeftSidebar = ({ players }) => {
  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    const sorted = [...players].sort((a, b) => b.score - a.score);
    setSortedPlayers(sorted);
  }, [players]);

  return (
    <div className="bg-blue-300 p-4 flex flex-col gap-2 border-r-8 border-blue-300 h-full rounded-lg">
      {sortedPlayers.map((player, index) => (
        <AnimatedPlayer key={player.username} player={player} index={index} />
      ))}
    </div>
  );
};

const AnimatedPlayer = ({ player, index }) => {
  const [props, api] = useSpring(() => ({
    from: { transform: "translateY(0px)", zIndex: 0 },
  }));

  useEffect(() => {
    api.start({
      to: { transform: `translateY(${index * 20}px)`, zIndex: 100 - index },
      config: { tension: 10, friction: 20 },
    });
  }, [index, api]);

  return (
    <animated.div
      style={{ ...props }}
      className="bg-gray-300 flex justify-between px-4 py-3 border border-purple-600 rounded-2xl items-center"
    >
      <div>{player.username}</div>
      <div>{player.score}</div>
    </animated.div>
  );
};

export default LeftSidebar;
