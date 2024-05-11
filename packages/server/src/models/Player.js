class Player {
  constructor({ id, username, isConnected = false }) {
    this.id = id;
    this.username = username;
    this.isConnected = isConnected;
    this.score = 0;
    this.foundWords = new Map();
  }

  updateScore(points) {
    this.score += points;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
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
