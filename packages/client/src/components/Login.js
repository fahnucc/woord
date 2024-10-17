import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      dispatch(setUser(result.data.user));
    }
  };

  return (
    <div className="w-1/2 mx-auto my-auto grid grid-rows-3">
      <div className="row-span-1 bg-blue-100 p-4 flex flex-col gap-2 rounded-lg">
        <input
          type="text"
          placeholder="your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-blue-400 p-2 h-18 focus:outline-none w-full mx-auto text-3xl text-center underline placeholder-blue-800 rounded-lg"
          autoFocus
        />
        <div className="row-span-1 bg-green-300 p-2 h-18 my-auto font-semibold text-xl flex flex-col rounded-lg">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
