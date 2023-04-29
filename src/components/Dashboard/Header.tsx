import * as React from "react";
import { mainGradient } from "../../styling/gradients";

interface IHeaderProps {}

export const Header: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h1
    className={`text-2xl font-bold whitespace-nowrap text-transparent ${mainGradient} bg-clip-text ${className}`}
  >
    {children}
  </h1>
);

const HeaderBar: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <>
      <div className="bg-transparent">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Header>Dota 2 Timers</Header>
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
