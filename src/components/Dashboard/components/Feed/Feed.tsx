import * as React from "react";
import Event from "../Event/Event";
import { Header } from "../../Header";
import { useAppSelector } from "../../../../state/hooks";
import { GameTimer } from "../../../../state/Game/GameTimer";
import { getGameTime } from "../../../../state/Game/gameSlice";

interface IFeedProps {}

const Feed: React.FunctionComponent<IFeedProps> = (props) => {
  const feed = useAppSelector((state) => state.game.feed);
  const timer = useAppSelector(getGameTime);

  return (
    <div className="rounded-xl p-4 w-full flex flex-col gap-2 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 via-zinc-900/70 to-zinc-900/40 justify-end">
      <div className="flex-1">
        <Header>Feed</Header>
      </div>
      {feed.slice(-8).map((item, idx) => {
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
