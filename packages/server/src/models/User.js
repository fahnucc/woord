import { v4 as uuidv4 } from "uuid";
import redisClient from "../RedisClient.js";

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
    this.save();
  }

  async incrementNumberOfRoomsCreated() {
    this.numberOfRoomsCreated++;
    await this.save();
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
    if (typeof jsonData === "string") {
      jsonData = JSON.parse(jsonData);
    }
    return new User(jsonData);
  }

  async save() {
    await redisClient.setUser(this.username, JSON.stringify(this.toJSON()));
  }
}

export default User;
