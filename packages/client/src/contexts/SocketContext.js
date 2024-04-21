import React, { createContext, useContext, useState, useCallback } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext({
  socket: null,
  connect: () => {},
  disconnect: () => {},
  emit: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const connect = useCallback((url = process.env.REACT_APP_SERVER_URL) => {
    const newSocket = io(url);
    setSocket(newSocket);
    console.log("Connected to socket:", url);
  }, []);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("Disconnected from socket");
    }
  }, [socket]);

  const emit = useCallback(
    (event, data, cb) => {
      console.log("Emitting:", event, data);
      if (socket) {
        socket.emit(event, data);
      }
      if (cb) {
        cb();
      }
    },
    [socket]
  );

  return (
    <SocketContext.Provider value={{ socket, connect, disconnect, emit }}>
      {children}
    </SocketContext.Provider>
  );
};
