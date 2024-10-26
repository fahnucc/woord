import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Layout from "../layout/Layout";
import Login from "../components/Login";
import HomeBoard from "../components/three/HomeBoard";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const [loginNeeded, setLoginNeeded] = useState(false);

  useEffect(() => {
    if (location.state?.loginNeeded) {
      setLoginNeeded(true);
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const handleWordClick = (word) => {
    if (!user.id) {
      setLoginNeeded(true);
      return;
    }
    if (word === "HOME") navigate("/");
    else if (word === "PLAY") navigate("/rooms");
    else if (word === "ROOMLIST") navigate("/rooms");
  };

  return (
    <Layout>
      <HomeBoard scale={1.8} onWordClick={handleWordClick} />
      <div className="flex flex-col gap-4 h-64">
        {user.id ? (
          <React.Fragment>
            Welcome, {user.username}
            <button className="bg-gray-100 p-1 ml-2" onClick={handleLogout}>
              Logout
            </button>
          </React.Fragment>
        ) : (
          <Login loginNeeded={loginNeeded} setLoginNeeded={setLoginNeeded} />
        )}
      </div>
    </Layout>
  );
};

export default Home;
