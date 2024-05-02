import express from "express";
import BaseResponse from "../responses/baseResponse.js";
import Player from "../models/Player.js";
import Room from "../models/Room.js";
import redisClient from "../RedisClient.js";

const router = express.Router();

router.get("/rooms", async (req, res) => {
  try {
    const rooms = await redisClient.getAllRooms();
    res.json(new BaseResponse(true, "Rooms retrieved successfully", rooms));
  } catch (error) {
    res.status(500).json(new BaseResponse(false, "An error occurred"));
  }
});

router.post("/delete-all-rooms", async (req, res) => {
  try {
    await redisClient.deleteAllRooms();
    res.json(new BaseResponse(true, "All rooms deleted successfully"));
  } catch (error) {
    res.status(500).json(new BaseResponse(false, "An error occurred"));
  }
});

router.post("/create-room", async (req, res) => {
  try {
    const { username, roomName } = req.body;
    if (!username || !roomName) {
      return res
        .status(400)
        .json(new BaseResponse(false, "Username and room name are required"));
    }

    const player = new Player({ username, isHost: true });
    const room = new Room({ roomName });
    room.connectPlayer(player);

    console.log("Room created:", room.id, room.roomName);
    res.json(new BaseResponse(true, "Room created successfully", room.id));
  } catch (error) {
    res.status(500).json(new BaseResponse(false, "An error occurred"));
  }
});

router.post("/join-room", async (req, res) => {
  try {
    const { roomId, username } = req.body;
    if (!roomId || !username) {
      return res
        .status(400)
        .json(new BaseResponse(false, "Room ID and username are required"));
    }

    const player = new Player({ username });
    const room = await redisClient.getRoom(roomId);
    if (!room) {
      return res.status(404).json(new BaseResponse(false, "Room not found"));
    }

    room.connectPlayer(player);
    await room.save();

    res.json(
      new BaseResponse(true, "Player joined room successfully", room.toJSON())
    );
  } catch (error) {
    res.status(500).json(new BaseResponse(false, "An error occurred"));
  }
});

router.get("/room/:id", async (req, res) => {
  try {
    const room = await redisClient.getRoom(req.params.id);
    if (!room) {
      return res.status(404).json(new BaseResponse(false, "Room not found"));
    }

    res.json(new BaseResponse(true, "Room retrieved successfully", room));
  } catch (error) {
    res.status(500).json(new BaseResponse(false, "An error occurred"));
  }
});

export default router;
