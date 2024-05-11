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

export { GameStatus, RoomStatus };
