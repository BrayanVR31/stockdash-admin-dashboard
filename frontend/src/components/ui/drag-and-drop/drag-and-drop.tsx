import { useState, FormEvent, ChangeEvent, useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { UploadImage } from "@/components/ui/drag-and-drop/UploadImage";
import { Upload } from "lucide-react";

const DragAndDrop = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // Desktop version
  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="bg-blue-700 flex items-center justify-center gap-x-2 w-full text-sm py-2 rounded-md [&>svg]:w-4 px-4 hover:bg-blue-700/80 duration-500 hover:translate-y-px transition-all"
          >
            <Upload />
            <span>Click para cargar imagen</span>
          </button>
        </DrawerTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sube tus imágenes</DialogTitle>
            <DialogDescription>
              Haz click para subir una imagen o arrastra y suelta
            </DialogDescription>
          </DialogHeader>
          <UploadImage />
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="bg-transparent border py-2 rounded-md min-w-28 hover:bg-neutral-800/90 transition-colors duration-500 text-sm"
              >
                Cancelar
              </button>
            </DialogClose>
            <input
              type="submit"
              className="bg-blue-700 border border-transparent py-2 rounded-md min-w-28 hover:bg-blue-700/80 transition-colors duration-500 text-sm cursor-pointer"
              value="Subir"
              form="upload-form"
              onClick={(event) => event.stopPropagation()}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  // Mobile version
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="bg-blue-700 flex items-center justify-center gap-x-2 w-full text-sm py-2 rounded-md [&>svg]:w-4 px-4 hover:bg-blue-700/80 duration-500 hover:translate-y-px transition-all"
          onClick={() => console.log("drawer...")}
        >
          <Upload />
          <span>Click para cargar imagen</span>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sube tus imágenes</DrawerTitle>
          <DrawerDescription>
            Haz click para subir una imagen o arrastra y suelta
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export { DragAndDrop };
