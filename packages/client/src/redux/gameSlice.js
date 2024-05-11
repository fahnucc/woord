import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  board: [],
  players: [],
  state: null,
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
    resetGame(state) {
      state.id = null;
      state.board = [];
      state.players = [];
      state.state = null;
    },
  },
});

export const { updateGame, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
