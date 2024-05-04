import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./redux/roomSlice";
import userReducer from "./redux/userSlice";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    room: roomReducer,
    user: userReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    user: state.user,
    room: state.room,
  });
});

export default store;
