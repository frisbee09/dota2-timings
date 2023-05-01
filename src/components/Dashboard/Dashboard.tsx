import * as React from "react";
import HeaderBar, { Header } from "./Header";
import Feed from "./components/Feed/Feed";
import Events from "./components/Feed/ActiveEvents";
import GameClock from "./components/GameClock/GameClock";

interface IDashboardProps {}

const screenSwipeClasses =
  "flex-shrink-0 w-11/12 scroll-ml-4 box-border snap-start sm:w-1/2 sm:flex-1";

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className="flex flex-col h-screen gap-4">
      <HeaderBar>
        <Header>Dota 2 Timers</Header>
        <GameClock className="justify-end" />
      </HeaderBar>
      <div className="w-screen min-h-0 mx-auto flex-1 gap-4 p-4 pt-0 flex flex-row min-w-0 max-w-screen overflow-x-auto snap-x snap-mandatory sm:overflow-visible sm:max-w-screen-xl">
        <Feed className={screenSwipeClasses} />
        <Events className={screenSwipeClasses} />
      </div>
    </div>
  );
};

export default Dashboard;
