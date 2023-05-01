import * as React from "react";
import Event, { IEventProps } from "../Event/Event";
import { GameEvent } from "../Event/events";
import { GameTimer } from "../../../../state/Game/GameTimer";
import { useAppSelector } from "../../../../state/hooks";
import { getActiveEvents } from "../../../../state/Game/gameSlice";
import { Header } from "../../Header";
import { confirmGradient, gradientText } from "../../../../styling/gradients";

const getNextEventAtString = (time: number) => {
  return new GameTimer(time).toString();
};

const mapActiveEventToProps = (event: GameEvent): IEventProps => ({
  key: event.id,
  title: event.name,
  text: `Next at ${getNextEventAtString(event.time)}`,
  image: event.img ? <img src={event.img} /> : undefined,
});

const mapInactiveEventToProps = (event: GameEvent): IEventProps => ({
  title: event.name,
  text: `Disabled.`,
});

interface IEventsProps {
  className?: string;
}

const Events: React.FunctionComponent<IEventsProps> = ({ className }) => {
  const activeEvents = useAppSelector(getActiveEvents);
  const activeEventsList = Object.values(activeEvents).sort(
    (a, b) => a.time - b.time
  );

  const ActiveNode = activeEventsList
    .slice(1)
    .map(mapActiveEventToProps)
    .map((p) => <Event {...p} />);

  const NextEvent = activeEventsList[0];

  return (
    <div className={`${className}`}>
      <div className="w-full h-full min-h-0 flex flex-col gap-2">
        <div className="relative w-full h-full min-h-0 overflow-y-auto flex flex-1 flex-col gap-2 rounded-xl p-4 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 via-zinc-900/70 to-zinc-900/40">
          <Header className="mb-2">Events</Header>
          {NextEvent ? (
            <>
              <h1 className={`text-lg font-semibold`}>Next</h1>
              <Event {...mapActiveEventToProps(NextEvent)} />
            </>
          ) : undefined}
          {ActiveNode.length ? (
            <>
              <h1 className="text-lg font-semibold mt-2">Active</h1>
              {ActiveNode}
            </>
          ) : undefined}
        </div>
      </div>
    </div>
  );
};

export default Events;
