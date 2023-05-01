import * as React from "react";
import HeaderBar from "./Header";
import Feed from "./components/Feed/Feed";
import Events from "./components/Feed/ActiveEvents";
import GameClock from "./components/GameClock/GameClock";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar>
        <GameClock className="sm:hiddena justify-end" />
      </HeaderBar>
      <div className="max-w-screen-xl w-full mx-auto grid flex-1 gap-5 p-4 sm:grid-cols-2 sm:grid-rows-2">
        <Feed />
        <Events />
      </div>
    </div>
  );
};

export default Dashboard;
