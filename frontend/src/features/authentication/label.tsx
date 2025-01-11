import React from "react";

type Props = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

function Label({ children, ...props }: Props) {
  return (
    <label
      className="font-bold text-sm text-stone-900 peer-required/input:after:content-['*'] peer-required/input:after:text-red-600 peer-required/input:after:ml-1"
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
