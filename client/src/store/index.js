import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import gameReducer from "../features/game/gameSlice.js";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
