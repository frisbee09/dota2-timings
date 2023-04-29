import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { getGameTime, pause, start } from "../../../../state/Game/gameSlice";

interface IGameClockProps {}

const GameClock: React.FunctionComponent<IGameClockProps> = (props) => {
  const dispatch = useAppDispatch();
  const gameTime = useAppSelector(getGameTime);
  const runningClock = useAppSelector((state) => state.game.isRunning);

  const [n, rerender] = React.useState<any>();

  React.useEffect(() => {
    if (runningClock) {
      const id = setInterval(() => {
        console.log("Calling rerender function");
        rerender(null);
      }, 1000);
      return clearInterval(id);
    }
  }, [runningClock]);

  return (
    <div>
      <h1>
        {gameTime.minutes}:{gameTime.seconds}
      </h1>
      <button onClick={() => dispatch(start())}>Start</button>
      <button onClick={() => dispatch(pause())}>Pause</button>
    </div>
  );
};

export default GameClock;
