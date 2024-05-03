import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUser } from "../../contexts/UserContext";
import { useSocket } from "../../contexts/SocketContext";
import Layout from "../../layout/Layout";

const Lobby = () => {
  const { id } = useParams();
  const { username } = useUser();
  const { connect } = useSocket();
  const { room } = useSelector((state) => state.room);

  useEffect(() => {
    if (!room) {
      connect(id, username);
    }
  }, [room, id]);

  if (!room) return <Layout>Loading...</Layout>;

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
          <h1 className="text-2xl font-bold mb-4">{room?.name}</h1>
          <p>Room ID: {room?.id}</p>
          <p>Players: {room?.players?.length}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mx-auto w-30">
            Start Game
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Lobby;
