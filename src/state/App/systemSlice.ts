// System level state, for things like audio on/off and anything else top level

import { createSlice } from "@reduxjs/toolkit";

export interface SystemState {
  playSounds: boolean;
}

const SOUNDS_LOCALSTORAGE_KEY = "DOTA2_TIMERS_PLAY_SOUNDS";
const startupSoundsState = localStorage.getItem(SOUNDS_LOCALSTORAGE_KEY);

const initialState: SystemState = {
  playSounds: startupSoundsState !== null ? Boolean(startupSoundsState) : true,
};

export const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggle: (state) => {
      state.playSounds = !state.playSounds;
      localStorage.setItem(
        SOUNDS_LOCALSTORAGE_KEY,
        state.playSounds.toString()
      );
    },
  },
});

export const { toggle } = systemSlice.actions;

export default systemSlice.reducer;
