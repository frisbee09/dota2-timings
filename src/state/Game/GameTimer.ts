export class GameTimer {
  gameStart: Date;

  constructor(duration?: number) {
    this.gameStart = new Date(Date.now() - (duration || 0));
  }

  public getMinutes = () => {
    return Math.floor(this.getDuration() / 1000 / 60);
  };

  public getSeconds = () => {
    return Math.floor(this.getDuration() / 1000) % 60;
  };

  public getDuration = () => {
    return Date.now() - this.gameStart.getTime();
  };

  public getClock = () => ({
    minutes: this.getMinutes(),
    seconds: this.getSeconds(),
  });

  public toString = () => {
    return `${this.getMinutes()
      .toString()
      .padStart(2, "02")}:${this.getSeconds().toString().padStart(2, "02")}`;
  };

  static fromTimestamp = (time: number) => {
    return new GameTimer(Date.now() - time);
  };
}
