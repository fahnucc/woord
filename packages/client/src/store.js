import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./redux/roomSlice";
import userReducer from "./redux/userSlice";
import gameReducer from "./redux/gameSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
    game: gameReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    user: state.user,
    room: state.room,
    game: state.game,
  });
});

export default store;
