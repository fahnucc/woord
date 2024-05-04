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
    <div className="w-1/2 mx-auto h-full grid grid-rows-3">
      <div className="row-span-1 bg-red-100 p-4 flex flex-col gap-2"></div>
      <div className="row-span-1 bg-blue-100 p-4 flex flex-col gap-2">
        <input
          type="text"
          placeholder=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-blue-400 p-2 h-24 focus:outline-none w-40 mx-auto text-3xl text-center underline"
          autoFocus
        />
      </div>
      <div className="row-span-1 bg-green-100 p-4 my-auto font-semibold text-xl flex flex-col gap-2">
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;
