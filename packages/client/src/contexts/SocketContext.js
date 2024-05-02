import React, { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SERVER_URL;
const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const connect = (roomId, username) => {
    if (!socket || !socket.connected) {
      const _socket = io(URL, {
        query: { roomId, username: username },
        autoConnect: false,
      });
      _socket.connect();

      _socket.on("update-room", (data) => {
        console.log("Room updated:", data.room);
        setRoom(data.room);
      });

      _socket.emit("join-room", { roomId, username });

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
    <SocketContext.Provider value={{ connect, emit, room }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
