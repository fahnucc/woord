import React from "react";
import { useSelector } from "react-redux";
import Layout from "../../layout/Layout";

const GameArea = () => {
  const room = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);

  const player = game?.players.find(
    (gamePlayer) => gamePlayer.username === user?.username
  );

  if (!room || !player) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-1 bg-gray-100 p-4 flex flex-col gap-2">
          {game.players?.map((player, index) => (
            <div
              className="bg-purple-300 flex justify-center items-center"
              key={`player-${index}`}
            >
              <div>{player.username}</div>
            </div>
          ))}
        </div>
        <div className="col-span-3 bg-gray-200 px-4 flex flex-col"></div>
      </div>
    </Layout>
  );
};

export default GameArea;
