import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="bg-green-300 w-full col-span-12 h-[4rem] px-4 flex items-center"
      id="navbar"
    >
      <h1 className="text-bold text-2xl pr-8">Woord</h1>
      <ul className="flex flex-row gap-4">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* <li>
          <Link to="/rooms">Rooms</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
