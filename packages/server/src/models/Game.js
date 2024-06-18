import { v4 as uuidv4 } from "uuid";
import path from "path";
import redisClient from "../RedisClient.js";
import Board from "./Board.js";
import Player from "./Player.js";
import Trie from "./Trie.js";
import { GameStatus } from "../enums/index.js";
import { loadWordsFromJson, addWordsToTrie } from "../words/utils.js";

class Game {
  constructor({
    id = uuidv4(),
    board = new Board(),
    players = [],
    state = GameStatus.IN_PROGRESS,
    timer = 180,
  }) {
    this.id = id;
    this.board = board;
    this.players = players;
    this.state = state;
    this.timer = timer;
  }

  async guessWord(playerId, x, y, word) {
    const player = this.players.find((p) => p.id === playerId);
    if (!player) return false;

    const valid = await this.validateWord(x, y, word);
    if (!valid) return false;

    player.addScore(word.length);

    return true;
  }

  async validateWord(x, y, word) {
    const trie = this.board.validWords;
    const isValid = trie.contains(word);
    return isValid;
  }

  async initializeTrie() {
    let trie = await redisClient.getTrie();

    if (trie === null) {
      trie = new Trie();
      const filePath = path.resolve("./src/words/sowpods.json");
      const wordSet = loadWordsFromJson(filePath);
      addWordsToTrie(wordSet, trie);
      await redisClient.setTrie(trie);
    }

    return trie;
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
    if (!jsonData) return null;
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
