import { confirmGradient, mainGradient } from "../../styling/gradients";

interface ExtraButtonProps {
  gradient?: string;
}

export const Button: React.FC<
  React.HTMLAttributes<HTMLButtonElement> & ExtraButtonProps
> = ({ children, gradient, ...props }) => (
  <button
    className={`p-1 ${gradient || confirmGradient} rounded-lg`}
    {...props}
  >
    <div className="text-sm font-semibold bg-zinc-100 text-black p-1 pl-2 pr-2 rounded-lg hover:bg-transparent hover:text-white transition">
      {children}
    </div>
  </button>
);
