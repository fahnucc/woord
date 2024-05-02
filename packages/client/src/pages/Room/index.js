import React from "react";
import { SocketProvider } from "../../contexts/SocketContext";
import Lobby from "./Lobby";

const Room = () => {
  return (
    <SocketProvider>
      <Lobby />
    </SocketProvider>
  );
};

export default Room;
