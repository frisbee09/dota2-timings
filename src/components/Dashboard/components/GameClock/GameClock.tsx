import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import {
  getGameTime,
  pause,
  reset,
  start,
  tick,
} from "../../../../state/Game/gameSlice";
import { Button } from "../../../Button/Button";

interface IGameClockProps {}

const GameClock: React.FunctionComponent<IGameClockProps> = (props) => {
  const dispatch = useAppDispatch();
  const gameTime = useAppSelector(getGameTime);
  const runningClock = useAppSelector((state) => state.game.isRunning);

  React.useEffect(() => {
    if (runningClock) {
      const id = setInterval(() => {
        dispatch(tick());
      }, 1000);
      return () => clearInterval(id);
    }
  }, [runningClock]);

  return (
    <div className="flex justify-stretch w-full gap-4 mb-6">
      <h1 className="text-3xl font-bold">{gameTime?.toString() || "00:00"}</h1>
      {runningClock ? (
        <Button onClick={() => dispatch(pause())}>Pause</Button>
      ) : (
        <Button onClick={() => dispatch(start())}>Start</Button>
      )}
      <Button onClick={() => dispatch(reset())}>Reset</Button>
    </div>
  );
};

export default GameClock;
