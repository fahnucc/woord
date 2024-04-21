import Home from "./components/Home";
import { SocketProvider } from "./contexts/SocketContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <div className="w-screen h-screen">
      <UserProvider>
        <SocketProvider>
          <Home />
        </SocketProvider>
      </UserProvider>
    </div>
  );
}

export default App;
