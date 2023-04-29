import * as React from "react";

interface IActionProps {}

const Action: React.FunctionComponent<IActionProps> = (props) => {
  return (
    <div className="flex max-w-xs p-2 border border-gray-200 rounded-lg shadow hover:bg-gray-800 dark:border-gray-700 ">
      <div className="w-10 h-10 rounded-3xl m-2 bg-white self-center" />
      <div>
        <h3 className="mb-0 text-xl font-bold tracking-tight">Yes</h3>
        <p className="mb-2 font-normal">You did it</p>
      </div>
    </div>
  );
};

export default Action;
