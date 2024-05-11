import { Server as SocketIOServer } from "socket.io";
import redisClient from "../RedisClient.js";
import { GameStatus } from "../enums/index.js";

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

      const user = room.getUser({ username: socket.username });
      user.setReady(isReady);

      console.log(
        `SET-READY: User [${socket.username}] set ready to [${isReady}]`
      );

      io.to(socket.roomId).emit("set-ready", {
        user: { username: socket.username, isReady },
      });
    });

    socket.on("start-game", async () => {
      const room = await redisClient.getRoom(socket.roomId);
      if (!room) return;

      await room.startGame();

      console.log(`START: Game started in [${socket.roomId}]`);

      io.to(socket.roomId).emit("update-room", { room });
      io.to(socket.roomId).emit("update-game", { game: room.game });
    });

    socket.on("find-word", async (data) => {
      const { word, x, y } = data;
      const room = await redisClient.getRoom(socket.roomId);

      if (!room || !room.game) return;

      const game = room.game;
      const player = game.players.find((p) => p.username === socket.username);

      if (!player) return;

      const valid = game.findWord(player.id, x, y, word);
      if (valid) {
        await room.save();
        io.to(socket.roomId).emit("update-game", { game });
      }
    });

    socket.on("disconnect", async () => {
      const room = await redisClient.getRoom(socket.roomId);
      if (!room) return;
      await room.disconnectUserByUsername(socket.username);

      console.log(
        `LEAVE: User [${socket.username}] disconnected from [${socket.roomId}]`
      );

      io.to(socket.roomId).emit("update-room", { room });
      socket.leave(socket.roomId);
    });
  });
};
