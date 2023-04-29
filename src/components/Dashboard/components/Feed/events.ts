import { GameTimer } from "../../../../state/Game/GameTimer";

export interface GameEvent {
  id: string;
  name: string;
  //   The time of the first event of this type
  time: number;
  //   The amount of time between the events
  interval?: number;
  //   When this event stops occurring (if ever)
  until?: number;
  // The amount of time, in milliseconds, before the event to alert into the feed
  alertTimeDelta?: number;
}

export interface FeedEvent {
  title: string;
  text: string;
}

const RuneEvents: { [key: string]: GameEvent } = {
  wisdomRune: {
    id: "wisdomRune",
    name: "Wisdom Rune",
    time: 7 * 60 * 1000,
    interval: 7 * 60 * 1000,
    until: undefined,
    alertTimeDelta: 30 * 1000,
  },
  bountyRune: {
    id: "bountyRune",
    name: "Bounty Rune",
    time: 3 * 60 * 1000,
    interval: 3 * 60 * 1000,
    until: undefined,
    alertTimeDelta: 30 * 1000,
  },
  waterRune: {
    id: "waterRune",
    name: "Water Rune",
    time: 2 * 60 * 1000,
    interval: 2 * 60 * 1000,
    until: 4 * 60 * 1000,
    alertTimeDelta: 10 * 1000,
  },
  powerRune: {
    id: "powerRune",
    name: "Power Rune",
    time: 6 * 60 * 1000,
    interval: 2 * 60 * 1000,
    alertTimeDelta: 10 * 1000,
  },
};

export const DefaultGameEvents = [...Object.values(RuneEvents)];
