import { ReactNode } from "react";
import { Navbar } from "@/components/ui/dashboard-navbar";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className="dark:bg-neutral-800/75 bg-slate-200/45 w-full grid grid-rows-[81px_minmax(calc(100vh-81px),max-content)]">
      <Navbar />
      <div className="w-full py-6 ">
        <div className="w-[95%] mx-auto">{children}</div>
      </div>
    </div>
  );
}

export { Layout };
