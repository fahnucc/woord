import React, { createContext, useContext, useState } from "react";
import { useSocket } from "./SocketContext";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);
  const { connect, disconnect } = useSocket();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setCurrentRoom(null);
    disconnect();
  };

  const joinRoom = (room) => {
    setCurrentRoom(room);
    connect();
  };

  const leaveRoom = () => {
    setCurrentRoom(null);
    disconnect();
  };

  const isGuest = () => {
    return user === null;
  };

  return (
    <UserContext.Provider
      value={{ user, currentRoom, login, logout, joinRoom, leaveRoom, isGuest }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
