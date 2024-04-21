import { createClient } from "redis";
import Room from "./models/Room.js";
import Player from "./models/Player.js";

class RedisClient {
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }

  async createRoom(roomId, value) {
    await this.client.set(`room:${roomId}`, value);
  }

  async getRoom(roomId) {
    const roomJsonString = await this.client.get(`room:${roomId}`);
    if (roomJsonString) {
      return Room.fromJSON(roomJsonString);
    } else {
      return null;
    }
  }

  async updateRoom(roomId, value) {
    await this.client.set(`room:${roomId}`, value);
  }

  async deleteRoom(roomId) {
    await this.client.del(`room:${roomId}`);
  }

  async deleteAllRooms() {
    const keys = await this.client.keys("room:*");
    if (keys.length === 0) return;
    await this.client.del(keys);
  }

  async getAllRooms() {
    const keys = await this.client.keys("room:*");
    if (keys.length === 0) return [];
    const roomsJsonStrings = await this.client.mGet(keys);
    const rooms = roomsJsonStrings
      .filter(Boolean)
      .map((jsonString) => Room.fromJSON(jsonString));
    return rooms;
  }
}

const redisClient = new RedisClient();
export default redisClient;
