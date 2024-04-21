import React, { useState, useEffect } from "react";
import Request from "../utils/Request";
import { useSocket } from "../contexts/SocketContext";
import { useUser } from "../contexts/UserContext";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { socket, connect, emit } = useSocket();
  const { joinRoom } = useUser();

  useEffect(() => {
    Request.get("/api/rooms")
      .then((data) => {
        console.log("Rooms data:", data);
        if (data.success) {
          setRooms(data.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch rooms:", error);
      });
  }, []);

  const handleJoinRoom = (roomId) => {
    const username = prompt("Enter your username");
    Request.post("/api/join-room", { username, roomId })
      .then((res) => {
        console.log("Joined to room:", res);
        if (res.success) {
          joinRoom(res.data.id);
        }
      })
      .catch((error) => {
        console.error("Failed to create room:", error);
      });
  };

  const handleCreateRoom = () => {
    const username = prompt("Enter your username");
    const roomName = prompt("Enter room name");
    Request.post("/api/create-room", { username, roomName })
      .then((res) => {
        console.log("Room created:", res);
        if (res.success) {
          joinRoom(res.data.id);
        }
      })
      .catch((error) => {
        console.error("Failed to create room:", error);
      });
  };

  return (
    <div className="bg-purple-600 h-[400px] w-[800px] flex flex-col">
      <div className="flex justify-between items-center gap-4 p-5 text-white">
        <h2 className="text-lg font-bold">Rooms</h2>
        <button
          className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateRoom}
        >
          Create Room
        </button>
      </div>
      <div className="flex-grow">
        <table className="w-full">
          <thead>
            <tr className="text-left text-white">
              <th className="p-4">Room Name</th>
              <th className="p-4">Players</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr
                key={index}
                onClick={() => handleJoinRoom(room.id)}
                className="hover:bg-purple-700 cursor-pointer"
              >
                <td className="p-4 border-t border-purple-500 text-black">
                  {room.roomName}
                </td>
                <td>{room.players.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
