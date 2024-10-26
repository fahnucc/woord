import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import About from "./pages/About";
import Room from "./pages/Room";
import { SocketProvider } from "./contexts/SocketContext";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/room/:id"
        element={
          <SocketProvider>
            <Room />
          </SocketProvider>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
