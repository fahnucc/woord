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
    this.users.push(user);
    await this.save();
  }

  async disconnectUser(user) {
    if (user.isHost) {
      if (this.users.length > 1) {
        this.users[1].isHost = true;
      } else {
        return await redisClient.deleteRoom(this.id);
      }
    }

    const index = this.users.indexOf(user);
    if (index > -1) {
      this.users.splice(index, 1);
      await this.save();
    }
  }

  async disconnectUserByUsername(username) {
    const user = this.users.find((user) => user.username === username);
    if (user) {
      await this.disconnectUser(user);
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
