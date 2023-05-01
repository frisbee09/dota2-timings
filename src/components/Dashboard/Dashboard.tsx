import * as React from "react";
import HeaderBar from "./Header";
import Feed from "./components/Feed/Feed";
import Events from "./components/Feed/ActiveEvents";
import GameClock from "./components/GameClock/GameClock";

interface IDashboardProps {}

const screenSwipeClasses =
  "flex-shrink-0 w-11/12 scroll-ml-4 box-border snap-start";

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar>
        <GameClock className="sm:hiddena justify-end" />
      </HeaderBar>
      <div className="w-screen mx-auto flex-1 gap-5 p-4 flex flex-row min-w-0 max-w-screen overflow-x-auto snap-x snap-mandatory">
        <Feed className={screenSwipeClasses} />
        <Events className={screenSwipeClasses} />
      </div>
    </div>
  );
};

export default Dashboard;
