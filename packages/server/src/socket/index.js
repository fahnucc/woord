import { Server as SocketIOServer } from "socket.io";
import redisClient from "../RedisClient.js";

export const initializeSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    console.log(`CONNECT: User [${socket.id}] connected`);
    socket.on("join-room", async (data) => {
      const { username, roomId } = data;
      socket.join(roomId);
      socket.username = username;
      socket.roomId = roomId;

      const room = await redisClient.getRoom(roomId);
      if (!room) return;

      console.log(
        `JOİN: User [${socket.username}] joined to [${socket.roomId}]`
      );

      io.to(roomId).emit("update-room", { room });
    });

    socket.on("disconnect", async () => {
      const room = await redisClient.getRoom(socket.roomId);
      if (!room) return;
      await room.disconnectPlayerUsername(socket.username);

      console.log(
        `LEAVE: User [${socket.username}] disconnected from [${socket.roomId}]`
      );

      io.to(socket.roomId).emit("update-room", { room });
      socket.leave(socket.roomId);
    });
  });
};
