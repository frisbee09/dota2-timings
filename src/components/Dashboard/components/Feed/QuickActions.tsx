import * as React from "react";
import { Header } from "../../Header";
import { QuickAction } from "../Event/Event";
import { useAppDispatch, useAppSelector } from "../../../../state/hooks";
import { RoshanEvents, TormentorKilled } from "../Event/events";
import { addEvents, getGameTime } from "../../../../state/Game/gameSlice";
import Roshan from "../Event/imgs/Emoticon_rosh.webp";
import Tormentor from "../Event/imgs/Tormentor.webp";

interface IQuickActionsProps {}

const QuickActions: React.FunctionComponent<IQuickActionsProps> = (props) => {
  const dispatch = useAppDispatch();
  const timer = useAppSelector(getGameTime);
  const noGame = timer === null;

  return (
    <div
      className={`flex flex-col flex-none gap-2 rounded-xl p-4 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 via-zinc-900/70 to-zinc-900/40 ${
        noGame ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <Header className="mb-4">Quick Actions</Header>
      <QuickAction
        onClick={() => dispatch(addEvents({ events: RoshanEvents }))}
        title="Start Roshan Timer"
        image={<img src={Roshan} />}
      />
      <QuickAction
        title="Start Dire Tormentor Timer"
        onClick={() =>
          dispatch(addEvents({ events: [TormentorKilled("Dire")] }))
        }
        image={<img src={Tormentor} />}
      />
      <QuickAction
        title="Start Radient Tormentor Timer"
        onClick={() =>
          dispatch(addEvents({ events: [TormentorKilled("Radient")] }))
        }
        image={<img src={Tormentor} />}
      />
    </div>
  );
};

export default QuickActions;
