import express from "express";
import BaseResponse from "../responses/baseResponse.js";
import redisClient from "../RedisClient.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    await redisClient.deleteAllUsers();

    const { username } = req.body;
    if (!username) {
      return res
        .status(400)
        .json(new BaseResponse(false, "Username is required"));
    }

    let user = await redisClient.getUser(username);
    if (!user) {
      user = await redisClient.createUser(username);
    }

    return res.json(new BaseResponse(true, "Login successful", { user: user }));
  } catch (error) {
    res.status(500).json(new BaseResponse(false, error.message));
  }
});

export default router;
