class Board {
  constructor(size = 4) {
    this.size = size;
    this.grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
    this.foundWords = new Map();

    this.initBoard();
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
    const board = new Board(jsonData.size);
    board.grid = jsonData.grid;
    return board;
  }

  toJSON() {
    return {
      size: this.size,
      grid: this.grid,
    };
  }

  validateWord(x, y, word) {
    return true;
  }
}

export default Board;
