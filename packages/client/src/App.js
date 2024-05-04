import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/rooms" element={<Rooms />} /> */}
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
