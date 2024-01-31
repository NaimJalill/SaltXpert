import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});
