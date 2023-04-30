import * as React from "react";
import Event, { IEventProps } from "../Event/Event";
import { AllEvents, GameEvent } from "../Event/events";
import { GameTimer } from "../../../../state/Game/GameTimer";
import { useAppSelector } from "../../../../state/hooks";
import { getActiveEvents } from "../../../../state/Game/gameSlice";

interface IActiveEventsProps {}

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

const ActiveEvents: React.FunctionComponent<IActiveEventsProps> = (props) => {
  const activeEvents = useAppSelector(getActiveEvents);

  const ActiveNode = Object.values(activeEvents)
    .map(mapActiveEventToProps)
    .map((p) => <Event {...p} />);

  const InactiveNode = Object.values(AllEvents)
    .filter((event) => !(event.id in activeEvents))
    .map(mapActiveEventToProps)
    .map((p) => <Event {...p} />);

  return (
    <div className="flex flex-col gap-2">
      {ActiveNode.length ? (
        <>
          <h1 className="text-l font-semibold">Active</h1>
          {ActiveNode}
        </>
      ) : undefined}
      {InactiveNode.length ? (
        <>
          <h1 className="text-l font-semibold">Inactive</h1>
          {InactiveNode}
        </>
      ) : undefined}
    </div>
  );
};

export default ActiveEvents;
