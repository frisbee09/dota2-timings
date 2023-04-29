export class GameTimer {
  gameStart: Date;

  constructor(duration?: number) {
    this.gameStart = new Date(Date.now() - (duration || 0));
  }

  public getMinutes = () => {
    return Math.floor(this.getDuration() / 1000 / 60);
  };

  public getSeconds = () => {
    return Math.floor(this.getDuration() / 1000);
  };

  public getDuration = () => {
    return Date.now() - this.gameStart.getTime();
  };

  static fromTimestamp = (time: number) => {
    return new GameTimer(Date.now() - time);
  };
}
