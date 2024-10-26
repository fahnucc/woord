import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { guessWord } from "../../redux/gameSlice";
import { useSocket } from "../../contexts/SocketContext";
import GameBoard from "../../components/three/GameBoard";
import LeftSidebar from "../../components/game/LeftSidebar";
import GameLayout from "../../layout/GameLayout";

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

  if (!room || !player) return <GameLayout>Loading...</GameLayout>;

  return (
    <GameLayout leftSidebar={<LeftSidebar players={game?.players} />}>
      <div className="rounded-lg p-4 bg-blue-300 w-full h-full">
        <GameBoard
          board={game.board.grid.flat()}
          onWordSelect={handleWordSelect}
          scale={1.25}
        />
      </div>
    </GameLayout>
  );
};

export default GameArea;
