import { UPDATE_ROOM } from "./actionTypes";

const initialState = {
  room: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ROOM:
      return {
        ...state,
        room: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
