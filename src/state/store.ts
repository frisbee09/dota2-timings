import { Middleware, Store, configureStore } from "@reduxjs/toolkit";
import gameReducer from "./Game/gameSlice";

const logger: Middleware = (store) => (next) => (action) => {
  console.log("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  return result;
};

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
