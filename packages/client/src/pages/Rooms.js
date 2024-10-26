import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";
import RoomList from "../components/RoomList";

const Rooms = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.id) {
      navigate("/", { state: { loginNeeded: true } });
    }
  });

  if (!user.id) return null;

  return (
    <Layout>
      <RoomList />
    </Layout>
  );
};

export default Rooms;
