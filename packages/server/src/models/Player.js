import { v4 as uuidv4 } from "uuid";

class Player {
  constructor({ id = uuidv4(), username, isHost = false }) {
    this.id = id;
    this.username = username;
    this.isHost = isHost;
    this.isReady = false;
  }

  setReady(ready) {
    this.isReady = ready;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      isHost: this.isHost,
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
