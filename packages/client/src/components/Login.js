import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { createRandomUsername } from "../utils/user";
import ShuffleIcon from "@mui/icons-material/Shuffle";

const Login = ({ loginNeeded, setLoginNeeded }) => {
  const [username, setUsername] = useState("");
  const [placeholder, setPlaceholder] = useState(createRandomUsername());
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username || placeholder }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      dispatch(setUser(result.data.user));
    }
  };

  useEffect(() => {
    if (loginNeeded) {
      setAnimate(true);
      const timeout = setTimeout(() => {
        setAnimate(false);
        setLoginNeeded(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [loginNeeded]);

  return (
    <div className="w-72 mx-auto h-full">
      <div className="grid grid-rows-2 bg-blue-100 p-4 flex flex-col gap-2 rounded-lg relative">
        <div className="flex items-center row-span-1">
          <input
            type="text"
            placeholder={placeholder}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-blue-400 p-2 h-18 focus:outline-none w-full text-xl text-center placeholder:opacity-30 placeholder:text-black rounded-lg"
            autoFocus
          />
          <button
            className="ml-2 h-full px-2 bg-blue-400 rounded-lg"
            onClick={() => setPlaceholder(createRandomUsername())}
          >
            <ShuffleIcon className="h-8 w-8" />
          </button>
        </div>
        <button
          onClick={handleLogin}
          className={`row-span-1 bg-green-300 p-2 h-18 my-auto text-xl flex flex-col rounded-lg justify-center items-center transition-all duration-500 ${
            animate ? "animate-shake bg-red-500" : ""
          }`}
        >
          Log in
        </button>
      </div>
    </div>
  );
};

export default Login;
