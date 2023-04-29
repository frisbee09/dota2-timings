import { useSelector } from "react-redux";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { GameTimer } from "./GameTimer";
import {
  DefaultGameEvents,
  GameEvent,
} from "../../components/Dashboard/components/Feed/events";

export interface GameState {
  timer: number | null;
  pausedAt: number | null;
  isRunning: boolean;

  activeEvents: GameEvent[];
  feed: any[];

  currentTime: number;
}

const initialState: GameState = {
  timer: null,
  pausedAt: null,
  isRunning: false,

  activeEvents: DefaultGameEvents,

  currentTime: Date.now(),
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true;
      state.timer = Date.now() - (state.pausedAt || 0);
      state.pausedAt = null;
    },
    pause: (state) => {
      if (!state.timer) {
        throw Error("Cannot pause game that isn't running");
      }
      state.isRunning = false;

      // Take a quick delta of the game's running length and persist in pausedAt
      state.pausedAt = GameTimer.fromTimestamp(state.timer).getDuration();
    },
    tick: (state) => {
      state.currentTime = Date.now();
    },
    addEvents: (state) => {},
  },
});

export const { start, pause, tick } = gameSlice.actions;

export const getGameTime = (state: RootState) => {
  if (!state.game.timer) {
    return { minutes: "00", seconds: "00" };
  }

  const gameTime = GameTimer.fromTimestamp(state.game.timer);
  return {
    minutes: gameTime.getMinutes(),
    seconds: gameTime.getSeconds(),
  };
};

export default gameSlice.reducer;
