import { v4 as uuidv4 } from "uuid";

class User {
  constructor({
    id = uuidv4(),
    username,
    createdAt = new Date(),
    numberOfRoomsCreated = 0,
  }) {
    this.id = id;
    this.username = username;
    this.createdAt = createdAt;
    this.numberOfRoomsCreated = numberOfRoomsCreated;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      createdAt: this.createdAt,
      numberOfRoomsCreated: this.numberOfRoomsCreated,
    };
  }

  static fromJSON(jsonData) {
    return new User(jsonData);
  }
}

export default User;
