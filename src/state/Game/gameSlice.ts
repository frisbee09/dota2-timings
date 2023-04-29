import { useSelector } from "react-redux";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { GameTimer } from "./GameTimer";

export interface GameState {
  timer: number | null;
  pausedAt: number | null;
  isRunning: boolean;
}

const initialState: GameState = {
  timer: null,
  pausedAt: null,
  isRunning: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true;
      const now = new Date().getTime();
      state.timer = now - (state.pausedAt || 0);
      state.pausedAt = null;
    },
    pause: (state) => {
      if (!state.timer) {
        throw Error("Cannot pause game that isn't running");
      }
      state.isRunning = false;

      // Take a quick delta of the game's running length and persist in pausedAt
      state.pausedAt = new Date().getTime() - state.timer;
    },
    tick: (state) => {
      const interval = GameTimer({ ms: state.timer || 0 });
    },
  },
});

export const { start, pause } = gameSlice.actions;

export const getGameTime = (state: RootState) => {
  if (!state.game.timer) {
    return { minutes: "00", seconds: "00" };
  }

  const gameTime = GameTimer({ ms: state.game.timer });
  return {
    minutes: gameTime.getMinutes().toString().padStart(2, "0"),
    seconds: gameTime.getSeconds().toString().padStart(2, "0"),
  };
};

export default gameSlice.reducer;
