import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../../contexts/SocketContext";
import { leaveRoom } from "../../redux/roomSlice";
import Layout from "../../layout/Layout";

const Lobby = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { connect, emit } = useSocket();
  const room = useSelector((state) => state.room);
  const user = useSelector((state) => state.user);
  const player = room?.players.find(
    (player) => player.username === user?.username
  );

  useEffect(() => {
    return () => {
      dispatch(leaveRoom());
    };
  }, []);

  useEffect(() => {
    if (!room.id && user.id) {
      connect(id, user.username);
    }
  }, [room, user, id]);

  function handleReady(isReady) {
    emit("set-ready", { isReady });
  }

  function handleStart() {
    if (!player.isHost) return;
    if (!room.isAllReady) return;
    emit("start-game");
  }

  if (!room || !player) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-1 bg-gray-100 p-4 flex flex-col gap-2">
          {room.players?.map((player, index) => (
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
          <p>Players: {room.players.length}</p>
          {player.isHost ? (
            <button
              className={`${
                room.isAllReady ? "bg-blue-500" : "bg-slate-500"
              } text-white px-4 py-2 rounded mx-auto w-30`}
              disabled={room.isAllReady === false}
              onClick={() => handleStart()}
            >
              Start Game
            </button>
          ) : player.isReady ? (
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
