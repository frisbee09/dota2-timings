import { useSelector } from "react-redux";
import { RootState } from "../store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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

        // Update the tick timer to now. We now know the last time we performed this check.
        state.currentTime = Date.now();

        const eventsToAlert = Object.values(state.activeEvents).filter(
          (event) => {
            const alertTime = Math.max(
              event.time - (event?.alertTimeDelta || 0),
              0
            );
            return alertTime <= previousCheckAt || alertTime <= gameTime;
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
    },
    addEvents: (state, action: PayloadAction<{ events: GameEvent[] }>) => {
      if (!state.timer) {
        alert("Start a game before adding new events");
        return;
      }

      const currentTime = GameTimer.fromTimestamp(state.timer).getDuration();
      action.payload.events.map((event) => {
        state.activeEvents[event.id] = {
          ...event,
          time:
            event.relativeTime !== undefined
              ? currentTime + event.relativeTime
              : event.time,
        };
      });
    },
    setTimer: (state, action: PayloadAction<{ time: string }>) => {
      if (action.payload.time.includes(":")) {
        const [minutes, seconds] = action.payload.time.split(":");
        const durationInMs =
          (parseInt(minutes) * 60 + parseInt(seconds)) * 1000;
        const gt = new GameTimer(durationInMs);

        // Now quickly fast forward to the new time
        let pseudoCurrentTime = state.currentTime;
        let activeEvents = Object.values(state.activeEvents).sort(
          (a, b) => b.time - a.time
        );

        while (activeEvents.some((event) => event.time <= gt.getDuration())) {}
      } else {
        alert(`${action.payload.time} not valid, needs to be in form xx:yy`);
      }
    },
  },
});

export const { start, pause, tick, reset, addEvents, setTimer } =
  gameSlice.actions;

export const getGameTime = (state: RootState) =>
  state.game.timer ? GameTimer.fromTimestamp(state.game.timer) : null;

export const getActiveEvents = (state: RootState) => state.game.activeEvents;

export const getFeed = (state: RootState) => state.game.feed;

export default gameSlice.reducer;
