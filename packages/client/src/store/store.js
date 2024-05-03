import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./roomReducer";

const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export default store;
