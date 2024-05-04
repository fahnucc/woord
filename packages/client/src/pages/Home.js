import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Layout from "../layout/Layout";
import Login from "../components/Login";
import RoomList from "../components/RoomList";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function handleLogout() {
    localStorage.removeItem("user");
    dispatch(logout());
  }

  return (
    <Layout>
      {user.id ? (
        <div>
          <div className="mb-4">
            Welcome, {user.username}{" "}
            <button className="bg-gray-100 p-1 ml-2" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <RoomList />
        </div>
      ) : (
        <Login />
      )}
    </Layout>
  );
};

export default Home;
