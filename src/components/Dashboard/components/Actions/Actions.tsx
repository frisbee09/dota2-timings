import * as React from "react";
import Action from "./Action";

interface IActionsProps {}

const Actions: React.FunctionComponent<IActionsProps> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <Action />
      <Action />
      <Action />
    </div>
  );
};

export default Actions;
