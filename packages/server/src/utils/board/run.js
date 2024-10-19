import Board from "../../models/Board.js";
import redisClient from "../../RedisClient.js";

const validCount = 70;

async function generateValidBoards() {
  const trie = await redisClient.getTrie();
  const validBoards = [];
  let now = new Date();
  while (validBoards.length < 5) {
    const board = new Board();
    if (await board.populateValidWords(trie, validCount)) {
      validBoards.push(board.toJSON());
      console.log(
        `Generated board ${validBoards.length} of 5 in ${new Date() - now}ms`
      );
      await redisClient.saveValidBoards(validBoards);
      now = new Date();
    }
  }

  process.exit();
}

generateValidBoards();
