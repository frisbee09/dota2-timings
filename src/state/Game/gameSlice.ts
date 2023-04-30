import { useSelector } from "react-redux";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import { GameTimer } from "./GameTimer";
import {
  DefaultGameEvents,
  GameEvent,
} from "../../components/Dashboard/components/Event/events";

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
    reset: () => initialState,
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

        state.feed.push(...eventsToAlert.map((x) => ({ ...x })));

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
    addEvents: (state, action) => {
      state.activeEvents[action.payload.id] = action.payload;
    },
  },
});

export const { start, pause, tick, reset } = gameSlice.actions;

export const getGameTime = (state: RootState) =>
  state.game.timer ? GameTimer.fromTimestamp(state.game.timer) : null;

export const getActiveEvents = (state: RootState) => state.game.activeEvents;

export const getFeed = (state: RootState) => state.game.feed;

export default gameSlice.reducer;
