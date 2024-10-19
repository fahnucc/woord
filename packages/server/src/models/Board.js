import Trie from "./Trie.js";
import redisClient from "../RedisClient.js";

class Board {
  constructor(size = 4, grid = null, validWordTrie = null) {
    this.size = size;
    this.grid =
      grid ||
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(null));
    this.validWordTrie = validWordTrie || new Trie();
    this.validWords = new Set();

    if (!grid) this.initBoard();
  }

  initBoard() {
    const frequencyDict = {
      E: 12.7,
      T: 9.1,
      A: 8.2,
      O: 7.5,
      I: 7.0,
      N: 6.7,
      S: 6.3,
      H: 6.1,
      R: 6.0,
      D: 4.3,
      L: 4.0,
      C: 2.8,
      U: 2.8,
      M: 2.4,
      W: 2.4,
      F: 2.2,
      G: 2.0,
      Y: 2.0,
      P: 1.9,
      B: 1.5,
      V: 1.0,
      K: 0.8,
      J: 0.2,
      X: 0.2,
      Q: 0.1,
      Z: 0.1,
    };

    const letterPool = this.createLetterPool(frequencyDict);

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = this.getRandomLetter(letterPool);
      }
    }
  }

  async findValidWords() {
    const now = new Date();
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const visited = Array.from({ length: this.size }, () =>
      Array(this.size).fill(false)
    );

    let totalWords = 0;
    this.validWords = [];

    const dfs = (x, y, path, node) => {
      if (x < 0 || x >= this.size || y < 0 || y >= this.size || visited[x][y])
        return;
      const char = this.grid[x][y].toLowerCase();
      const currentPath = path + char;
      if (!node.canLeadToWord(char)) return;

      visited[x][y] = true;
      node = node.getChildNode(char);
      if (node.isEndOfWord && currentPath.length >= 3) {
        this.validWordTrie.insert(currentPath);
        this.validWords.push(currentPath);
        totalWords++;
      }

      for (const [dx, dy] of directions) {
        dfs(x + dx, y + dy, currentPath, node);
      }
      visited[x][y] = false;
    };

    let trie = await redisClient.getTrie();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        dfs(i, j, "", trie.root);
      }
    }

    console.log(
      `CALC: ${totalWords} valid words populated in ${new Date() - now}ms`
    );
  }

  async populateValidWords(trie, validCount = 500) {
    const now = new Date();
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const visited = Array.from({ length: this.size }, () =>
      Array(this.size).fill(false)
    );
    let foundWords = new Set();

    const dfs = (x, y, path, node) => {
      if (
        x < 0 ||
        x >= this.size ||
        y < 0 ||
        y >= this.size ||
        visited[x][y] ||
        !node
      )
        return;
      visited[x][y] = true;
      path += this.grid[x][y].toLowerCase();

      if (node.isEndOfWord && path.length >= 3) {
        foundWords.add(path);
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx,
          ny = y + dy;
        if (
          nx >= 0 &&
          nx < this.size &&
          ny >= 0 &&
          ny < this.size &&
          !visited[nx][ny]
        ) {
          const nextChar = this.grid[nx][ny].toLowerCase();
          if (node.children[nextChar]) {
            dfs(nx, ny, path, node.children[nextChar]);
          }
        }
      }
      visited[x][y] = false;
    };

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const startChar = this.grid[i][j].toLowerCase();
        if (trie.root.children[startChar]) {
          dfs(i, j, "", trie.root.children[startChar]);
        }
      }
    }
    return foundWords.size >= validCount;
  }

  createLetterPool(frequencyDict) {
    let letterPool = [];
    for (const [letter, frequency] of Object.entries(frequencyDict)) {
      const count = Math.round(frequency * 10);
      for (let i = 0; i < count; i++) {
        letterPool.push(letter);
      }
    }
    return letterPool;
  }

  getRandomLetter(letterPool) {
    const randomIndex = Math.floor(Math.random() * letterPool.length);
    return letterPool[randomIndex];
  }

  static fromJSON(jsonData) {
    const board = new Board(
      jsonData.size,
      jsonData.grid,
      Trie.fromJSON(jsonData.validWordTrie)
    );
    return board;
  }

  toJSON() {
    return {
      size: this.size,
      grid: this.grid,
      validWordTrie: this.validWordTrie.toJSON(),
    };
  }
}

export default Board;
