const GameStatus = Object.freeze({
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  FINISHED: 2,
});

const RoomStatus = Object.freeze({
  LOBBY: 0,
  IN_GAME: 1,
  FINISHED: 2,
});

const RoomStatusReverse = Object.freeze({
  0: "Lobby",
  1: "In Game",
  2: "Finished",
});

export { GameStatus, RoomStatus, RoomStatusReverse };
