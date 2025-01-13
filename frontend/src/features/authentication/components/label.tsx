import React from "react";

type Props = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

function Label({ children, ...props }: Props) {
  return (
    <label
      className="font-bold text-sm text-neutral-800/95 peer-required/input:after:content-['*'] peer-required/input:after:text-red-600 peer-required/input:after:ml-1 dark:text-neutral-200"
      {...props}
    >
      {children}
    </label>
  );
}

export { Label };
