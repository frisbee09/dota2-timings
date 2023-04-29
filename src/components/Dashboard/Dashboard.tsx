import * as React from "react";
import HeaderBar from "./Header";
import Feed from "./components/Feed/Feed";
import Actions from "./components/Actions/Actions";

interface IDashboardProps {}

const Dashboard: React.FunctionComponent<IDashboardProps> = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderBar />
      <div className="max-w-screen-xl w-full mx-auto grid grid-cols-2 flex-1 gap-5 p-4">
        <Actions />
        <Feed />
      </div>
    </div>
  );
};

export default Dashboard;
