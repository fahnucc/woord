import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import roomRoutes from "./routes/roomRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { initializeSocket } from "./socket/index.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "Woord!" });
});

app.use("/api", userRoutes);
app.use("/api", roomRoutes);

initializeSocket(server);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
