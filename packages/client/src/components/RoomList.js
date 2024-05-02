import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Request from "../utils/Request";
import { useUser } from "../contexts/UserContext";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const { username, setUsername } = useUser();
  const navigate = useNavigate();

  const fetchRooms = () => {
    Request.get("/api/rooms")
      .then((data) => {
        if (data.success) {
          setRooms(data.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch rooms:", error);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleJoinRoom = (roomId) => {
    const username = prompt("Enter your username");
    if (!username) return;

    Request.post("/api/join-room", { username, roomId })
      .then((res) => {
        console.log("Joined to room:", res);
        if (res.success) {
          setUsername(username);
          navigate(`/room/${roomId}`);
        }
      })
      .catch((error) => {
        console.error("Failed to create room:", error);
      });
  };

  const handleCreateRoom = () => {
    const roomName = prompt("room name");
    if (!roomName) return;

    let _username = username;
    if (!_username || !_username.length) {
      _username = prompt("username");
    }
    setUsername(_username);

    Request.post("/api/create-room", { username: _username, roomName })
      .then((res) => {
        if (res.success) {
          const roomId = res.data;
          navigate(`/room/${roomId}`);
        }
      })
      .catch((error) => {
        console.error("Failed to create room:", error);
      });
  };

  const handleDeleteAllRooms = () => {
    Request.post("/api/delete-all-rooms")
      .then((res) => {
        if (res.success) {
          fetchRooms();
        }
      })
      .catch((error) => {
        console.error("Failed to create room:", error);
      });
  };

  return (
    <div className="bg-purple-600 h-[400px] w-full flex flex-col">
      <div className="flex justify-between items-center gap-4 p-5 text-white">
        <h2 className="text-lg font-bold">Rooms</h2>
        <div className="flex justify-end gap-4">
          <button
            className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteAllRooms}
          >
            <DeleteIcon />
          </button>
          <button
            className="bg-green-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateRoom}
          >
            <AddIcon />
          </button>
          <button
            className="bg-blue-600 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
            onClick={fetchRooms}
          >
            <RefreshIcon />
          </button>
        </div>
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
                <td className="p-4">{room.roomName}</td>
                <td className="p-4">{room.players.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
