import { v4 as uuidv4 } from "uuid";
import redisClient from "../RedisClient.js";
import Board from "./Board.js";
import Player from "./Player.js";
import { GameStatus } from "../enums/index.js";

class Game {
  constructor({
    id = uuidv4(),
    board = new Board(),
    players = [],
    state = GameStatus.NOT_STARTED,
    timer = 180,
  }) {
    this.id = id;
    this.board = board;
    this.players = players;
    this.state = state;
    this.timer = timer;
  }

  async findWord(playerId, x, y, word) {
    const player = this.players.find((p) => p.id === playerId);
    if (!player) return false;

    const valid = this.board.validateWord(x, y, word);
    if (!valid) return false;

    this.board.placeWord(x, y, word);
    player.updateScore(word.length);

    await this.save();
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      board: this.board.toJSON(),
      players: this.players.map((player) => player.toJSON()),
      state: this.state,
      timer: this.timer,
    };
  }

  static fromJSON(jsonData) {
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }
    return new Game({
      id: jsonData.id,
      board: Board.fromJSON(jsonData.board),
      players: jsonData.players.map(Player.fromJSON),
      state: jsonData.state,
      timer: jsonData.timer,
    });
  }

  async save() {
    await redisClient.setGame(this.id, JSON.stringify(this.toJSON()));
  }
}

export default Game;
