import { createSlice } from "@reduxjs/toolkit";

export const GuessResult = {
  PENDING: "PENDING",
  INVALID: "INVALID",
  VALID: "VALID",
};

const initialState = {
  id: null,
  board: [],
  players: [],
  state: null,
  lastWord: { word: "", valid: GuessResult.PENDING },
  foundWords: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGame(state, action) {
      const { id, board, players, state: gameState, timer } = action.payload;
      state.id = id;
      state.board = board;
      state.players = players;
      state.state = gameState;
      state.timer = timer;
    },
    guessWord(state, action) {
      state.lastWord.word = action.payload;
      state.lastWord.valid = GuessResult.PENDING;
    },
    validWord(state) {
      state.lastWord.valid = GuessResult.VALID;
      state.foundWords.push(state.lastWord.word);
    },
    invalidWord(state) {
      state.lastWord.valid = GuessResult.INVALID;
    },
    resetGame(state) {
      state.id = null;
      state.board = [];
      state.players = [];
      state.state = null;
      state.lastWord = { word: "", valid: GuessResult.PENDING };
      state.foundWords = [];
    },
  },
});

export const { updateGame, resetGame, guessWord, validWord, invalidWord } =
  gameSlice.actions;
export default gameSlice.reducer;
