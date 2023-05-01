import * as React from "react";
import Event, { IEventProps } from "../Event/Event";
import { AllEvents, GameEvent } from "../Event/events";
import { GameTimer } from "../../../../state/Game/GameTimer";
import { useAppSelector } from "../../../../state/hooks";
import { getActiveEvents } from "../../../../state/Game/gameSlice";
import { Header } from "../../Header";
import { confirmGradient, gradientText } from "../../../../styling/gradients";

interface IEventsProps {}

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

const Events: React.FunctionComponent<IEventsProps> = (props) => {
  const activeEvents = useAppSelector(getActiveEvents);
  const activeEventsList = Object.values(activeEvents).sort(
    (a, b) => a.time - b.time
  );

  const ActiveNode = activeEventsList
    .slice(1)
    .map(mapActiveEventToProps)
    .map((p) => <Event {...p} />);

  const InactiveNode = Object.values(AllEvents)
    .filter((event) => !(event.id in activeEvents))
    .map(mapActiveEventToProps)
    .map((p) => <Event {...p} />);

  const NextEvent = activeEventsList[0];

  return (
    <div className="rounded-xl p-4 w-full flex flex-col gap-2 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 via-zinc-900/70 to-zinc-900/40">
      <Header>Events</Header>
      {NextEvent ? (
        <>
          <h1 className={`text-lg font-semibold`}>Next</h1>
          <Event {...mapActiveEventToProps(NextEvent)} />
        </>
      ) : undefined}
      {InactiveNode.length ? (
        <>
          <h1 className="text-l font-semibold">Inactive</h1>
          {InactiveNode}
        </>
      ) : undefined}
      {ActiveNode.length ? (
        <>
          <h1 className="text-lg font-semibold">Active</h1>
          {ActiveNode}
        </>
      ) : undefined}
    </div>
  );
};

export default Events;
