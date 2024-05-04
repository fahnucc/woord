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

  getPlayer({ username, userId }) {
    return this.players.find(
      (player) => player.username === username || player.id === userId
    );
  }

  connectPlayer(player) {
    this.players.push(player);
    this.save();
  }

  async disconnectPlayer(player) {
    if (player.isHost) {
      if (this.players.length > 1) {
        this.players[1].isHost = true;
      } else {
        return await redisClient.deleteRoom(this.id);
      }
    }

    const index = this.players.indexOf(player);
    if (index > -1) {
      this.players.splice(index, 1);
      this.save();
    }
  }

  async disconnectPlayerUsername(username) {
    const player = this.players.find((player) => player.username === username);
    if (player) {
      await this.disconnectPlayer(player);
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
