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

router.post("/create-room", async (req, res) => {
  try {
    const { username, roomName } = req.body;
    const player = new Player({ username });
    const room = new Room({ roomName });
    room.connectPlayer(player);

    console.log("Room created:", room.id, room.roomName);
    res.json(new BaseResponse(true, "Room created successfully", room.id));
  } catch (error) {
    res.status(500).json(new BaseResponse(false, "An error occurred"));
  }
});

export default router;
