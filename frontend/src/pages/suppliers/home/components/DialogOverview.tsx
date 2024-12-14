import { ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@shared/ui";

// Types
interface Props {
  children: ReactNode;
  footer: ReactNode;
  triggerButton: ReactNode;
}

export function DialogOverview({ children, footer, triggerButton }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{children}</DialogHeader>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
