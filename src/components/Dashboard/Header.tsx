import * as React from "react";
import { mainGradient } from "../../styling/gradients";

interface IHeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<{
  className?: string;
  children?: React.ReactNode;
}> = ({ children, className }) => (
  <h1
    className={`text-2xl font-bold whitespace-nowrap text-transparent ${mainGradient} bg-clip-text ${className}`}
  >
    {children}
  </h1>
);

const HeaderBar: React.FunctionComponent<IHeaderProps> = ({ children }) => {
  return (
    <>
      <div className="bg-transparent">
        <div className="max-w-screen-xl flex flex-wrap gap-3 items-center justify-between mx-auto p-4 pb-0">
          {children}
        </div>
      </div>
    </>
  );
};

export default HeaderBar;
