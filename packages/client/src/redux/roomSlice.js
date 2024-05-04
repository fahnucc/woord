import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  players: [],
  roomName: null,
  isAllReady: false,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updateRoom(state, action) {
      state.id = action.payload.id;
      state.players = action.payload.players;
      state.roomName = action.payload.roomName;
      state.isAllReady = action.payload.players.every((player) => player.ready);
    },
    leaveRoom(state) {
      state.id = null;
      state.players = [];
      state.roomName = null;
      state.isAllReady = false;
    },
    setPlayerReady(state, action) {
      const { username, isReady } = action.payload;
      const playerIndex = state.players.findIndex(
        (player) => player.username === username
      );
      if (playerIndex !== -1) {
        state.players[playerIndex].isReady = isReady;
      }
      state.isAllReady = state.players.every(
        (player) => player.isReady || player.isHost
      );
      console.log("Setting player isAllReady:", state.isAllReady);
    },
    startGame(state) {
      if (state.isAllReady) {
        console.log("Game is starting!");
      }
    },
  },
});

export const { updateRoom, leaveRoom, setPlayerReady, startGame } =
  roomSlice.actions;
export default roomSlice.reducer;
