import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import {
  getGameTime,
  pause,
  start,
  tick,
} from "../../../../state/Game/gameSlice";

interface IGameClockProps {}

const GameClock: React.FunctionComponent<IGameClockProps> = (props) => {
  const dispatch = useAppDispatch();
  const gameTime = useAppSelector(getGameTime);
  const runningClock = useAppSelector((state) => state.game.isRunning);

  const [n, rerender] = React.useState<any>();

  React.useEffect(() => {
    if (runningClock) {
      const id = setInterval(() => {
        dispatch(tick());
      }, 1000);
      return () => clearInterval(id);
    }
  }, [runningClock]);

  return (
    <div>
      <h1>
        {gameTime.minutes.toString().padStart(2, "0")}:
        {gameTime.seconds.toString().padStart(2, "0")}
      </h1>
      <button onClick={() => dispatch(start())}>Start</button>
      <button onClick={() => dispatch(pause())}>Pause</button>
    </div>
  );
};

export default GameClock;
