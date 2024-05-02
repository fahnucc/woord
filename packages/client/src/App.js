import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import Room from "./pages/Room";

function App() {
  return (
    <div className="w-screen h-screen">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
