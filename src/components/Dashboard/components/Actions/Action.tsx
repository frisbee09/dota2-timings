import * as React from "react";
import { mainGradient } from "../../../../styling/gradients";

const BackgroundWithGradient: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className={`max-w-xs rounded-lg shadow ${mainGradient} p-1`}>
    {children}
  </div>
);

const GreyBGWithHover: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex bg-gray-900 rounded-lg w-full h-full p-2 hover:bg-transparent hover:text-black transition overflow-hidden">
    {children}
  </div>
);

const ActionImage: React.FC<{
  children?: React.ReactNode;
  imageColor?: string;
}> = ({ children, imageColor }) => (
  <div
    className={`w-10 h-10 rounded-3xl m-4 bg-white self-center bg-${
      imageColor || "gray-200"
    } border-2 border-${imageColor || "gray-200"}`}
  >
    {children}
  </div>
);

const ActionTitle: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => <h3 className="m-0 text-xl font-bold tracking-tight">{children}</h3>;

const ActionText: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <p className="mb-0 font-normal">{children}</p>
);

interface IActionProps {
  title?: string;
  text?: string;
  image?: React.ReactNode;
  imageColor?: string;
}

const Action: React.FunctionComponent<IActionProps> = ({
  title,
  text,
  image,
  imageColor,
}) => {
  return (
    <BackgroundWithGradient>
      <GreyBGWithHover>
        <ActionImage imageColor={imageColor}>{image}</ActionImage>
        <div className="self-center">
          <ActionTitle>{title}</ActionTitle>
          <ActionText>{text}</ActionText>
        </div>
      </GreyBGWithHover>
    </BackgroundWithGradient>
  );
};

export default Action;
