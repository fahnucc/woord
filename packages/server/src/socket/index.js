import { Server as SocketIOServer } from "socket.io";
import redisClient from "../RedisClient.js";

export const initializeSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    const { username, roomId } = socket.handshake.query;
    console.log(`CONNECT: User [${username}] connected`);
    socket.username = username;
    socket.roomId = roomId;

    socket.on("join-room", async () => {
      socket.roomId = roomId;
      socket.join(socket.roomId);

      const room = await redisClient.getRoom(socket.roomId);
      if (!room) return;

      console.log(
        `JOİN: User [${socket.username}] joined to [${socket.roomId}]`
      );

      io.to(socket.roomId).emit("update-room", { room });
    });

    socket.on("set-ready", async (data) => {
      const { isReady } = data;

      const room = await redisClient.getRoom(socket.roomId);

      const player = room.getPlayer({ username: socket.username });
      player.setReady(isReady);

      console.log(
        `SET-READY: User [${socket.username}] set ready to [${isReady}]`
      );

      io.to(socket.roomId).emit("set-ready", {
        player: { username: socket.username, isReady },
      });
    });

    socket.on("start-game", async () => {
      const room = await redisClient.getRoom(socket.roomId);
      if (!room) return;

      // await room.startGame();

      console.log(`START: Game started in [${socket.roomId}]`);

      io.to(socket.roomId).emit("update-room", { room });
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
