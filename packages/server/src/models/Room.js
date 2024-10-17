import { v4 as uuidv4 } from "uuid";
import redisClient from "../RedisClient.js";
import User from "./User.js";
import Game from "./Game.js";
import Player from "./Player.js";
import { RoomStatus } from "../enums/index.js";

class Room {
  constructor({
    id = uuidv4(),
    roomName,
    users = [],
    game = null,
    status = RoomStatus.LOBBY,
  }) {
    this.id = id;
    this.roomName = roomName;
    this.users = users;
    this.game = game;
    this.status = status;
    this.save();
  }

  getUser({ username, userId }) {
    return this.users.find(
      (user) => user.username === username || user.id === userId
    );
  }

  async connectUser(user) {
    const existingUser = this.getUser({ username: user.username });
    if (!existingUser) {
      this.users.push(user);
    } else {
      existingUser.isConnected = false;
    }
    await this.save();
  }

  async disconnectUserByUsername(username) {
    const user = this.users.find((u) => u.username === username);
    if (user) {
      user.isConnected = false;
      await this.save();
    }
  }

  async startGame() {
    this.game = new Game({
      players: this.users.map((user) => new Player(user)),
    });

    await this.game.board.populateValidWords();

    this.status = RoomStatus.IN_GAME;
  }

  toJSON() {
    return {
      id: this.id,
      roomName: this.roomName,
      status: this.status,
      users: this.users.map((user) => user.toJSON()),
      game: this.game?.toJSON(),
    };
  }

  static fromJSON(jsonData) {
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }
    return new Room({
      id: jsonData.id,
      roomName: jsonData.roomName,
      status: jsonData.status,
      users: jsonData.users.map(User.fromJSON),
      game: Game.fromJSON(jsonData.game),
    });
  }

  async save() {
    await redisClient.setRoom(this.id, JSON.stringify(this.toJSON()));
  }
}

export default Room;
