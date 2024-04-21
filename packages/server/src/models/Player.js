import { v4 as uuidv4 } from "uuid";

class Player {
  constructor({ id = uuidv4(), username }) {
    this.id = id;
    this.username = username;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
    };
  }

  static fromJSON(jsonData) {
    return new Player(jsonData);
  }
}

export default Player;
