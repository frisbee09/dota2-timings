import * as React from "react";
import { mainGradient } from "../../../../styling/gradients";

const BackgroundWithGradient: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className={`max-w-xs rounded-lg shadow ${mainGradient} p-1`}>
    {children}
  </div>
);

const ButtonBackgroundWithGradient: React.FC<
  {
    children?: React.ReactNode;
  } & React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...props }) => (
  <button
    className={`max-w-xs rounded-lg shadow ${mainGradient} p-1`}
    {...props}
  >
    {children}
  </button>
);

const GreyBGWithHover: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={`${className} flex bg-gray-900 rounded-lg w-full h-full p-2 hover:bg-transparent hover:text-black transition overflow-hidden`}
  >
    {children}
  </div>
);

const EventImage: React.FC<{
  children?: React.ReactNode;
  imageColor?: string;
  className?: string;
}> = ({ children, imageColor, className }) => (
  <div className={`${className} w-10 h-10 m-4 flex`}>
    {React.isValidElement(children) &&
      React.cloneElement(children as any, { className: "rounded-full" })}
  </div>
);

const EventTitle: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h3 className={`${className} m-0 text-xl font-bold tracking-tight`}>
    {children}
  </h3>
);

const EventText: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p className={`${className} mb-0 font-normal`}>{children}</p>
);

export interface IEventProps {
  key?: string;
  title?: string;
  text?: string;
  image?: React.ReactNode;
  imageColor?: string;
}

export const QuickAction: React.FunctionComponent<
  IEventProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ title, image, imageColor, ...props }) => {
  return (
    <ButtonBackgroundWithGradient {...props}>
      <GreyBGWithHover className="p-1">
        <EventImage imageColor={imageColor} className="m-1 ml-3 mr-3">
          {image}
        </EventImage>
        <div className="self-center flex-1">
          <EventTitle className="text-lg">{title}</EventTitle>
        </div>
      </GreyBGWithHover>
    </ButtonBackgroundWithGradient>
  );
};

export const Event: React.FunctionComponent<IEventProps> = ({
  title,
  text,
  image,
  imageColor,
}) => {
  return (
    <BackgroundWithGradient>
      <GreyBGWithHover>
        <EventImage imageColor={imageColor}>{image}</EventImage>
        <div className="self-center flex-1">
          <EventTitle>{title}</EventTitle>
          <EventText>{text}</EventText>
        </div>
      </GreyBGWithHover>
    </BackgroundWithGradient>
  );
};

export default Event;
