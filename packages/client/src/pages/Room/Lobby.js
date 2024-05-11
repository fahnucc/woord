import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../../contexts/SocketContext";
import Layout from "../../layout/Layout";

const Lobby = () => {
  const { emit } = useSocket();
  const room = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);
  const roomUser = room?.users.find(
    (roomUser) => roomUser.username === user?.username
  );

  function handleReady(isReady) {
    emit("set-ready", { isReady });
  }

  function handleStart() {
    if (!roomUser.isHost) return;
    if (!room.isAllReady) return;
    emit("start-game");
  }

  if (!room || !roomUser) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-1 bg-gray-100 p-4 flex flex-col gap-2">
          {room.users?.map((player, index) => (
            <div
              className="bg-purple-300 flex justify-center items-center"
              key={`player-${index}`}
            >
              <div>{player.username}</div>
            </div>
          ))}
        </div>
        <div className="col-span-3 bg-gray-200 px-4 flex flex-col">
          <h1 className="text-2xl font-bold mb-4">{room.name}</h1>
          <p>Room ID: {room.id}</p>
          <p>Players: {room.users.length}</p>
          {roomUser.isHost ? (
            <button
              className={`${
                room.isAllReady ? "bg-blue-500" : "bg-slate-500"
              } text-white px-4 py-2 rounded mx-auto w-30`}
              disabled={room.isAllReady === false}
              onClick={() => handleStart()}
            >
              Start Game
            </button>
          ) : roomUser.isReady ? (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mx-auto w-30"
              onClick={() => handleReady(false)}
            >
              Cancel
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mx-auto w-30"
              onClick={() => handleReady(true)}
            >
              Ready
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Lobby;
