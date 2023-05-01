import { GameTimer } from "../../../../state/Game/GameTimer";
import BountyRune from "./imgs/Emoticon_bountyrune.webp";
import WaterRune from "./imgs/Emoticon_water_rune.webp";
import PowerRune from "./imgs/Emoticon_doubledamage.webp";
import Roshan from "./imgs/Emoticon_rosh.webp";
import WisdomRune from "./imgs/WisdomRune.webp";
import Tormentor from "./imgs/Tormentor.webp";

export interface GameEvent {
  id: string;
  name: string;
  //   The time of the first event of this type
  time: number;
  relativeTime?: number;
  //   The amount of time between the events
  interval?: number;
  //   When this event stops occurring (if ever)
  until?: number;
  // The amount of time, in milliseconds, before the event to alert into the feed
  alertTimeDelta?: number;

  img?: string;
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
    img: WisdomRune,
  },
  bountyRune: {
    id: "bountyRune",
    name: "Bounty Rune",
    time: 0,
    interval: 1 * 60 * 1000,
    until: undefined,
    alertTimeDelta: 30 * 1000,
    img: BountyRune,
  },
  waterRune: {
    id: "waterRune",
    name: "Water Rune",
    time: 2 * 60 * 1000,
    interval: 2 * 60 * 1000,
    until: 4 * 60 * 1000,
    alertTimeDelta: 10 * 1000,
    img: WaterRune,
  },
  powerRune: {
    id: "powerRune",
    name: "Power Rune",
    time: 6 * 60 * 1000,
    interval: 2 * 60 * 1000,
    alertTimeDelta: 10 * 1000,
    img: PowerRune,
  },
};

const TormentorSpawn = {
  tormentorSpawn: {
    id: "tormentorSpawn",
    name: "Tormentors spawn",
    time: 20 * 60 * 1000,
    img: Tormentor,
  },
};

const minToMs = (min: number) => min * 60 * 1000;
const MIN_ROSH_RESPAWN_IN_MINUTES = 7;
const MAX_ROSH_RESPAWN_IN_MINUTES = 11;

const MIN_ROSH_RESPAWN_IN_MS = minToMs(MIN_ROSH_RESPAWN_IN_MINUTES);
const MAX_ROSH_RESPAWN_IN_MS = minToMs(MAX_ROSH_RESPAWN_IN_MINUTES);
const TOTAL_ROSH_RESPAWN_WINDOW_IN_MS =
  MAX_ROSH_RESPAWN_IN_MS - MIN_ROSH_RESPAWN_IN_MINUTES;

interface RoshEventConfig {
  fraction: number;
  text: (frac: number) => string;
}
const ROSH_EVENTS_CONFIG: RoshEventConfig[] = [
  {
    fraction: 0,
    text: (frac) => "Rosh can spawn",
  },
  {
    fraction: 0.25,
    text: (frac) => `Rosh timer @ ${frac * 100}%`,
  },
  {
    fraction: 0.5,
    text: (frac) => `Rosh timer @ ${frac * 100}%`,
  },
  {
    fraction: 0.75,
    text: (frac) => `Rosh timer @ ${frac * 100}%`,
  },
  {
    fraction: 1,
    text: (frac) => "Rosh spawned",
  },
];

const getRoshInterval = (frac: number) =>
  MIN_ROSH_RESPAWN_IN_MS + frac * TOTAL_ROSH_RESPAWN_WINDOW_IN_MS;

export const RoshanEvents: GameEvent[] = ROSH_EVENTS_CONFIG.map((cfg, idx) => ({
  id: `RoshanTimer${cfg.fraction}`,
  name: cfg.text(cfg.fraction),
  time: 0,
  relativeTime: getRoshInterval(cfg.fraction),
  img: Roshan,
}));

export const TormentorKilled = (side: string): GameEvent => ({
  id: `TormentorRespawn${side}`,
  name: `${side}-side Tormentor respawned`,
  time: 0,
  relativeTime: 10 * 60 * 1000,
  img: Tormentor,
});

export const DefaultGameEvents = { ...RuneEvents, ...TormentorSpawn };

export const AllEvents = { ...RuneEvents };
