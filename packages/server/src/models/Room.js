import { v4 as uuidv4 } from "uuid";
import redisClient from "../RedisClient.js";
import Player from "./Player.js";

class Room {
  constructor({ id = uuidv4(), roomName, players = [] }) {
    this.id = id;
    this.roomName = roomName;
    this.players = players;
    this.save();
  }

  connectPlayer(player) {
    this.players.push(player);
    this.save();
  }

  disconnectPlayer(player) {
    const index = this.players.indexOf(player);
    if (index > -1) {
      this.players.splice(index, 1);
      this.save();
    }
  }

  toJSON() {
    return {
      id: this.id,
      roomName: this.roomName,
      players: this.players.map((player) => player.toJSON()),
    };
  }

  static fromJSON(jsonData) {
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }
    return new Room({
      id: jsonData.id,
      roomName: jsonData.roomName,
      players: jsonData.players.map(Player.fromJSON),
    });
  }

  async save() {
    await redisClient.setRoom(this.id, JSON.stringify(this.toJSON()));
  }
}

export default Room;
