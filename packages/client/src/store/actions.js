import { UPDATE_ROOM } from "./actionTypes";

export const updateRoom = (room) => ({
  type: UPDATE_ROOM,
  payload: room,
});
