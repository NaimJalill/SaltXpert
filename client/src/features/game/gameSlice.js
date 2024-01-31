import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: false,
  game: {
    players: [],
    turn: 0,
    start: false,
    roll: 0,
  },
  card: {
    item: null,
  },

  professor: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
      state.load = true;
    },
    setCard(state, action) {
      state.card.item = action.payload;
    },
    setProfessor(state, action) {
      state.professor = action.payload;
    },
  },
});

export const { setGame, setCard, setProfessor } = gameSlice.actions;
export default gameSlice.reducer;
