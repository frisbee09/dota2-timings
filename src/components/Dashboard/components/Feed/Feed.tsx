import * as React from "react";
import Event from "../Event/Event";
import { Header } from "../../Header";
import { useAppSelector } from "../../../../state/hooks";
import { GameTimer } from "../../../../state/Game/GameTimer";
import { getGameTime } from "../../../../state/Game/gameSlice";
import QuickActions from "./QuickActions";

interface IFeedProps {
  className?: string;
}

const Feed: React.FunctionComponent<IFeedProps> = ({ className }) => {
  const feed = useAppSelector((state) => state.game.feed);
  const timer = useAppSelector(getGameTime);

  return (
    <div className={`${className}`}>
      <div className="w-full h-full min-h-0 flex flex-col gap-2">
        <div className="relative w-full h-full min-h-0 overflow-y-auto flex flex-1 flex-col gap-2 rounded-xl p-4 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 via-zinc-900/70 to-zinc-900/40">
          <Header className="mb-4">Feed</Header>
          {[...feed].reverse().map((item, idx) => {
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
          {/* <div className="sticky bottom-0 -m-full w-full h-10 bg-gradient-to-t from-zinc-900/100 via-zinc-900/100 to-zinc-900/0" /> */}
        </div>
        <QuickActions />
      </div>
    </div>
  );
};

export default Feed;
