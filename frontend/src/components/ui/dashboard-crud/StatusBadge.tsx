import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  variant: Variant;
}

type Variant = "danger" | "success";
type ObjectVariant = {
  [key in Variant]: {
    text: string;
    icon: string;
  };
};

const StatusBadge = ({ children, variant }: Props) => {
  const classNameVariant: ObjectVariant = {
    danger: {
      text: "dark:text-red-300 dark:bg-red-900/70 bg-red-200/75 text-red-600 border-red-600",
      icon: "bg-red-600 dark:bg-red-300",
    },
    success: {
      text: "dark:text-emerald-300 dark:bg-emerald-900/70 dark:before:bg-emerald-300 bg-emerald-200/75 text-emerald-600 dark:border-emerald-300 border-emerald-600",
      icon: "dark:bg-emerald-300 bg-emerald-600",
    },
  };
  return (
    <span
      style={{ fontSize: "0.815rem" }}
      className={`flex border w-max items-center justify-star relative px-3 py-1 rounded-full ${classNameVariant[variant].text}`}
    >
      <div
        className={`${classNameVariant[variant].icon} h-2 aspect-square rounded-full mr-2`}
      />
      {children}
    </span>
  );
};

export { StatusBadge };
