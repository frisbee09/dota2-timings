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

  activeEvents: { [key: string]: GameEvent };
  feed: any[];

  currentTime: number;
}

const initialState: GameState = {
  timer: null,
  pausedAt: null,
  isRunning: false,

  activeEvents: DefaultGameEvents,
  feed: [],

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
      if (state.timer) {
        const gameTime = GameTimer.fromTimestamp(state.timer).getDuration();
        const previousCheckAt = gameTime - (Date.now() - state.currentTime);

        const eventsToAlert = Object.values(state.activeEvents).filter(
          (event) => {
            const alertTime = Math.max(
              event.time - (event?.alertTimeDelta || 0),
              0
            );
            return alertTime >= previousCheckAt && alertTime <= gameTime;
          }
        );

        state.feed.push(...eventsToAlert);

        eventsToAlert.forEach((event) => {
          // Check whether the event will recur
          if (event.interval && (!event.until || event.until > gameTime)) {
            event.time += event.interval;
          } else {
            // It doesn't, so we remove it from the list of active events
            delete state.activeEvents[event.id];
          }
        });
      }

      // Update the tick timer to now. We now know the last time we performed this check.
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
