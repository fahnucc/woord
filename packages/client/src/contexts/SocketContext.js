import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom, setPlayerReady } from "../redux/roomSlice";

const URL = process.env.REACT_APP_SERVER_URL;
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const connect = (roomId) => {
    if (!socket || !socket.connected) {
      const _socket = io(URL, {
        query: { roomId, username: user.username },
        autoConnect: false,
      });
      _socket.connect();

      _socket.on("update-room", (data) => {
        console.log("Room updated:", data.room);
        dispatch(updateRoom(data.room));
      });

      _socket.on("set-ready", (data) => {
        dispatch(setPlayerReady(data.player));
      });

      _socket.emit("join-room");

      setSocket(_socket);
      console.log("Connected to socket with room ID:", roomId);
    }
  };

  const emit = (event, data, cb) => {
    if (socket && socket.connected) {
      socket.emit(event, data, cb);
      console.log("Emitting:", event, data);
    } else {
      console.log("Socket is not connected for emit.");
    }
  };

  return (
    <SocketContext.Provider value={{ connect, emit }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
