import { useRef } from "react";
import { Upload, X } from "lucide-react";
import DropArea from "./DropArea";

interface Props {
  maxFiles?: number;
}

const DropZone = ({ maxFiles = 1 }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeDialog = () => dialogRef.current?.close();
  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        type="button"
        className="btn max-sm:btn-sm btn-primary"
      >
        <Upload className="w-4.5 max-sm:w-3.5" />
        <span>Seleccionar archivos</span>
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-[70%] max-w-xl">
          <button
            className="btn btn-sm btn-circle btn-soft btn-primary absolute right-2 top-2"
            onClick={closeDialog}
            type="button"
          >
            <X className="w-4" />
          </button>
          <h3 className="font-bold text-xl text-center mb-2">
            Sube y adjunta tus archivos
          </h3>
          <p className="text-xs text-neutral-content text-center mb-8">
            Esta acción subirá tus archivos y podrás acceder a ellos
            posteriormente.
          </p>
          <DropArea maxFiles={maxFiles} />
          <div className="flex gap-x-2 mt-8">
            <button
              onClick={closeDialog}
              type="button"
              className="btn btn-md flex-1"
            >
              Cancelar
            </button>
            <button className="btn btn-md btn-primary flex-1" type="button">
              Adjuntar archivos
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export { DropZone };
