import classNames from "classnames";
import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

type LabelProps = DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;

interface Props extends LabelProps {
  isRequired?: boolean;
}

function Label({ isRequired = false, children, ...props }: Props) {
  const styles = classNames(
    "font-normal",
    "text-sm",
    "block",
    "mb-2",
    isRequired
      ? "after:content-['*'] after:dark:text-red-400 after:ml-1 after:text-red-600 after:font-bold"
      : "",
  );
  return (
    <label className={styles} {...props}>
      {children}
    </label>
  );
}

export { Label };
