import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  game: {
    players: [],
    turn: 0,
    start: false,
    roll: 0,
  },
  card: {
    item: null,
    open: false,
    disabled: false,
  },

  professor: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGame(state, action) {
      state.game = action.payload;
    },
    setCard(state, action) {
      state.card.item = action.payload;
      state.card.open = true;
      state.card.disabled = false;
    },
    setProfessor(state, action) {
      state.professor = action.payload;
    },
    setClosed(state) {
      state.card.open = false;
    },
    setDisabled(state) {
      state.card.disabled = true;
    },
  },
});

export const { setGame, setCard, setProfessor, setClosed, setDisabled } =
  gameSlice.actions;
export default gameSlice.reducer;
