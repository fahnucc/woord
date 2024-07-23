class Player {
  constructor({
    id,
    username,
    isConnected = false,
    score = 0,
    foundWords = [],
  }) {
    this.id = id;
    this.username = username;
    this.isConnected = isConnected;
    this.score = score;
    this.foundWords = foundWords;
  }

  addScore(points) {
    this.score += points;
  }

  onWordFound(word) {
    this.foundWords.push(word);
    this.score += word.length;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      isConnected: this.isConnected,
      score: this.score,
      foundWords: Array.from(this.foundWords),
    };
  }

  static fromJSON(jsonData) {
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }
    return new Player(jsonData);
  }
}

export default Player;
