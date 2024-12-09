import { ReactNode } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@shared/ui";

// Types
interface Props {
  children: ReactNode;
  contentButton: ReactNode;
}

export function AccordionMenu({ contentButton, children }: Props) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="products">
        <AccordionTrigger className="mt-4 bg-transparent text-slate-800 py-3 px-5 flex hover:bg-blue-500/15 hover:text-blue-600 font-medium rounded-lg items-center">
          <div className="flex items-center gap-x-3">{contentButton}</div>
        </AccordionTrigger>
        <AccordionContent className="p-2">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
