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

const EventImage: React.FC<{
  children?: React.ReactNode;
  imageColor?: string;
}> = ({ children, imageColor }) => (
  <div className={`w-10 h-10 rounded-3xl m-4 self-center pt-1`}>{children}</div>
);

const EventTitle: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <h3 className="m-0 text-xl font-bold tracking-tight">{children}</h3>
);

const EventText: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <p className="mb-0 font-normal">{children}</p>
);

export interface IEventProps {
  key?: string;
  title?: string;
  text?: string;
  image?: React.ReactNode;
  imageColor?: string;
}

const Event: React.FunctionComponent<IEventProps> = ({
  title,
  text,
  image,
  imageColor,
}) => {
  return (
    <BackgroundWithGradient>
      <GreyBGWithHover>
        <EventImage imageColor={imageColor}>{image}</EventImage>
        <div className="self-center">
          <EventTitle>{title}</EventTitle>
          <EventText>{text}</EventText>
        </div>
      </GreyBGWithHover>
    </BackgroundWithGradient>
  );
};

export default Event;
