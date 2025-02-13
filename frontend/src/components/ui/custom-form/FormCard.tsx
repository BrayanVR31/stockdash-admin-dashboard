import { ReactNode } from "react";

// Types
interface Props {
  header: ReactNode;
  children: ReactNode;
  className?: string;
}

function FormCard({ children, className = "", header }: Props) {
  return (
    <div
      className={`dark:bg-neutral-900 h-full bg-white rounded-md border dark:border-neutral-400/70 ${className}`}
    >
      <div className="px-4 py-3 border-b">{header}</div>
      <div className="px-4 py-3">{children}</div>
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
}

function CardTitle({ children }: CardTitleProps) {
  return <h5 className="font-semibold text-lg">{children}</h5>;
}

export { FormCard, CardTitle };
