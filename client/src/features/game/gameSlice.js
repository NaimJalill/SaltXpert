import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: false,
  game: null,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
      state.load = true;
    },
  },
});

export const { setGame } = gameSlice.actions;
export default gameSlice.reducer;
