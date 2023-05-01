import * as React from "react";
import Event from "../Event/Event";
import { Header } from "../../Header";
import { useAppSelector } from "../../../../state/hooks";
import { GameTimer } from "../../../../state/Game/GameTimer";
import { getGameTime } from "../../../../state/Game/gameSlice";

interface IFeedProps {
  className?: string;
}

const Feed: React.FunctionComponent<IFeedProps> = ({ className }) => {
  const feed = useAppSelector((state) => state.game.feed);
  const timer = useAppSelector(getGameTime);

  return (
    <div
      className={`${className} rounded-xl p-4 flex flex-col gap-2 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 via-zinc-900/70 to-zinc-900/40 justify-start`}
    >
      <Header className="mb-4">Feed</Header>
      {feed.reverse().map((item, idx) => {
        const gt = new GameTimer(item.time);
        const timeString = gt.toString();
        const pastTense =
          (timer?.getDuration() || -Infinity) > gt.getDuration();

        return (
          <Event
            key={`${item.id}${idx}`}
            title={item.name}
            image={<img src={item.img} />}
            text={`${pastTense ? "Spawned" : "Spawns"} at ${timeString}`}
          />
        );
      })}
    </div>
  );
};

export default Feed;
