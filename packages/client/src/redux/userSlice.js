import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    createdAt: null,
    numberOfRoomsCreated: 0,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.createdAt = action.payload.createdAt;
      state.numberOfRoomsCreated = action.payload.numberOfRoomsCreated;
    },
    logout: (state) => {
      state.id = null;
      state.username = null;
      state.createdAt = null;
      state.numberOfRoomsCreated = 0;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
