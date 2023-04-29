interface GameTimerInit {
  ms: number;
}

const defaultInit: GameTimerInit = {
  ms: 0,
};

export interface GameTimer extends Date {
  getMinutes: () => number;
}

export const GameTimer = (init?: GameTimerInit): GameTimer => {
  init = { ...defaultInit, ...init };

  const date = new Date(init.ms);
  date.getMinutes = () => date.getMilliseconds() % (60 * 1000);

  return date;
};
