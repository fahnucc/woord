import { createClient } from "redis";
import Room from "./models/Room.js";
import User from "./models/User.js";
import Trie from "./models/Trie.js";

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

  async createUser(username) {
    const user = new User({ username });
    this.setUser(username, JSON.stringify(user.toJSON()));
    return user;
  }

  async setUser(username, value) {
    await this.client.set(`user:${username}`, value);
  }

  async getUser(username) {
    const userJsonString = await this.client.get(`user:${username}`);
    if (userJsonString) {
      return User.fromJSON(userJsonString);
    } else {
      return null;
    }
  }

  async deleteUser(username) {
    await this.client.del(`user:${username}`);
  }

  async deleteAllUsers() {
    const keys = await this.client.keys("user:*");
    if (keys.length === 0) return;
    await this.client.del(keys);
  }

  async setRoom(roomId, value) {
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

  async setGame(gameId, value) {
    await this.client.set(`game:${gameId}`, value);
  }

  async getGame(gameId) {
    const gameJsonString = await this.client.get(`game:${gameId}`);
    if (gameJsonString) {
      return JSON.parse(gameJsonString);
    } else {
      return null;
    }
  }

  async deleteGame(gameId) {
    await this.client.del(`game:${gameId}`);
  }

  async deleteAllGames() {
    const keys = await this.client.keys("game:*");
    if (keys.length === 0) return;
    await this.client.del(keys);
  }

  async setTrie(trie) {
    const trieJSON = trie.toJSON();
    await this.client.set("trie", trieJSON);
  }

  async getTrie() {
    const trieJSON = await this.client.get("trie");
    if (trieJSON) {
      return Trie.fromJSON(trieJSON);
    } else {
      return null;
    }
  }

  async saveValidBoards(boards) {
    await this.client.set("validBoards", JSON.stringify(boards));
  }

  async getValidBoards() {
    const boards = await this.client.get("validBoards");
    return JSON.parse(boards);
  }

  async getRandomValidBoard() {
    const validBoards = await this.getValidBoards();
    const randomIndex = Math.floor(Math.random() * validBoards.length);
    return validBoards[randomIndex];
  }
}

const redisClient = new RedisClient();
export default redisClient;
