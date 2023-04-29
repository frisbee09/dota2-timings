import * as React from "react";
import Action from "../Actions/Action";
import { Header } from "../../Header";

interface IFeedProps {}

const Feed: React.FunctionComponent<IFeedProps> = (props) => {
  return (
    <div className="rounded-xl p-4 w-full flex flex-col gap-2 bg-gradient-to-br from-zinc-900/90 via-zinc-900/40 via-zinc-900/70 to-zinc-900/40 justify-end">
      <div className="flex-1">
        <Header>Feed</Header>
      </div>
      <Action />
      <Action />
      <Action />
    </div>
  );
};

export default Feed;
