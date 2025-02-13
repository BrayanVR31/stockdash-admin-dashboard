import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type NativeProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends NativeProps {}

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className={`bg-blue-800 px-4 py-2 rounded-md text-sm font-normal hover:bg-blue-700 transition-colors duration-500 text-white flex items-center [&>svg]:w-5 [&>svg]:mr-2`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
