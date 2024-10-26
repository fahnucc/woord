import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

const Header = () => {
  const navigate = useNavigate();

  const navList = [
    { name: "Home", to: "/" },
    { name: "Rooms", to: "/rooms" },
    { name: "About", to: "/about" },
  ];

  return (
    <header className="bg-green-300 w-full h-16 px-4 flex items-center justify-between">
      <div className="flex items-center h-full gap-4 sm:gap-8">
        <Logo
          className="h-2/3 w-max text-purple-300"
          onClick={() => navigate("/")}
        />
        <nav className="flex h-full justify-center items-center">
          {navList.map((navItem) => (
            <div
              key={navItem.name}
              className="hover:underline hover:bg-green-500 h-full flex items-center px-3"
            >
              <Link to={navItem.to}>{navItem.name}</Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
