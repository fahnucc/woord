import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  users: [],
  roomName: null,
  isAllReady: true,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updateRoom(state, action) {
      state.id = action.payload.id;
      state.users = action.payload.users;
      state.roomName = action.payload.roomName;
      state.isAllReady = action.payload.users.every(
        (user) => user.ready || user.isHost
      );
    },
    leaveRoom(state) {
      state.id = null;
      state.users = [];
      state.roomName = null;
      state.isAllReady = false;
    },
    setPlayerReady(state, action) {
      console.log("Setting player ready:", action.payload);
      const { username, isReady } = action.payload;
      const userIndex = state.users.findIndex(
        (user) => user.username === username
      );
      if (userIndex !== -1) {
        state.users[userIndex].isReady = isReady;
      }
      state.isAllReady = state.users.every(
        (user) => user.isReady || user.isHost
      );
      console.log("Setting user isAllReady:", state.isAllReady);
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
