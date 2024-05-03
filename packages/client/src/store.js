import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./store/roomReducer";
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
  saveState({
    user: store.getState().user,
  });
});

export default store;
