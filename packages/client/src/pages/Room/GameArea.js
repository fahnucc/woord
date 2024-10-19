import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { guessWord } from "../../redux/gameSlice";
import { useSocket } from "../../contexts/SocketContext";
import Layout from "../../layout/Layout";
import GameBoard from "../../components/three/GameBoard";

const GameArea = () => {
  const room = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);
  const game = useSelector((state) => state.game);
  const { emit } = useSocket();
  const dispatch = useDispatch();

  const handleWordSelect = useCallback(
    (word, row, col) => {
      emit("find-word", { word, row, col });
      dispatch(guessWord({ word }));
    },
    [emit]
  );

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
              className="bg-purple-300 flex justify-between px-4 py-2 border border-purple-600 rounded-2xl items-center"
              key={`player-${index}`}
            >
              <div>{player.username}</div>
              <div>{player.score}</div>
            </div>
          ))}
        </div>
        <div className="col-span-3 bg-gray-200 flex flex-col justify-center items-center">
          <GameBoard
            board={game.board.grid.flat()}
            onWordSelect={handleWordSelect}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GameArea;
