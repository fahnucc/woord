import express from "express";
import bodyParser from "body-parser";
import { Server as SocketIOServer } from "socket.io";
import http from "http";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes.js";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "Woord!" });
});
app.use("/api", roomRoutes);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("create-room", async ({ username, roomName }) => {});

  socket.on("join-room", async (roomId, username) => {});

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
