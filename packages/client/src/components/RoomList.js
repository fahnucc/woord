import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { leaveRoom } from "../redux/roomSlice";
import { resetGame } from "../redux/gameSlice";
import Request from "../utils/Request";
import { RoomStatusReverse } from "../enums";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const RoomList = () => {
  const user = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchRooms = () => {
    Request.get("/api/rooms")
      .then((data) => {
        console.log(data);
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
    const intervalId = setInterval(fetchRooms, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleJoinRoom = (roomId) => {
    Request.post("/api/join-room", { username: user.username, roomId })
      .then((res) => {
        if (res.success) {
          dispatch(leaveRoom());
          dispatch(resetGame());
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

    Request.post("/api/create-room", { username: user.username, roomName })
      .then((res) => {
        if (res.success) {
          const roomId = res.data;
          dispatch(leaveRoom());
          dispatch(resetGame());
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
    <div className="h-full w-full bg-purple-600 grid grid-cols-12 gap-4 rounded-lg">
      <div className="col-span-10 overflow-auto p-4 pr-0 flex flex-col">
        <div className="w-full h-full border border-purple-900 bg-purple-400">
          <table className="w-full table-fixed">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="p-4 border border-purple-900 w-3/5">
                  Room Name
                </th>
                <th className="p-4 border border-purple-900 w-1/5">Players</th>
                <th className="p-4 border border-purple-900 w-1/5">Status</th>
              </tr>
            </thead>
            <tbody className="flex-1 overflow-y-auto">
              {rooms.map((room, index) => (
                <tr
                  key={index}
                  onClick={() => handleJoinRoom(room.id)}
                  className="hover:bg-purple-500 cursor-pointer text-white h-10"
                >
                  <td className="py-3 px-4 border border-purple-900 border-l-0">
                    {room.roomName}
                  </td>
                  <td className="p-3 border border-purple-900 text-center">
                    {room.users.length}
                  </td>
                  <td className="p-3 border border-purple-900 border-r-0 text-center">
                    {RoomStatusReverse[room.status]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-4 p-4 border-l-4 border-blue-300">
        {user.username === "faho" && (
          <button
            className="bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
            onClick={handleDeleteAllRooms}
          >
            <DeleteIcon />
          </button>
        )}
        <button
          className="bg-green-600 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateRoom}
        >
          <AddIcon />
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={fetchRooms}
        >
          <RefreshIcon />
        </button>
      </div>
    </div>
  );
};

export default RoomList;
