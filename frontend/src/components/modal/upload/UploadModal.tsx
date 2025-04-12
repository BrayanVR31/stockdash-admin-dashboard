import { useRef } from "react";
import { Upload } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useUploadAreaStore } from "@/store/uploadAreaStore";
import { UploadConfig } from "./uploadConfig";
import CardFile from "./CardFile";
import ModalAction from "./ModalAction";
import ModalHeader from "./ModalHeader";
import DropZone from "./DropZone";

interface UploadModalProps {
  onUploadFile?: (fileIds: string[]) => void;
  existingImages?: string[] | string;
  config: UploadConfig;
}

const getArrayFromItem = (item: string | string[] | undefined) => {
  if (typeof item === "string") return [item];
  else if (Array.isArray(item)) return item;
  return [];
};

const UploadModal = ({
  onUploadFile,
  existingImages,
  config,
}: UploadModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const files = useUploadAreaStore((state) => state.files);
  const globalError = useUploadAreaStore((state) => state.error);
  const handleSelectFile = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        onClick={handleSelectFile}
        type="button"
        className="btn btn-md btn-primary"
      >
        <Upload className="w-4" />
        <span>Seleccionar archivo(s)</span>
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <ModalHeader
            modalRef={dialogRef}
            title="Sube tus imagenes en esta sección"
            description="Arrastra y suelta los archivos en el area designada"
          />
          {/** Drag & drop area */}
          <DropZone {...config} />
          <p className="text-red-500 text-center mt-4 text-xs">{globalError}</p>
          <div className="mt-6 flex flex-col gap-6">
            {/** File list map array */}
            <AnimatePresence>
              {files.map((file) => (
                <CardFile key={file.id || file.tempId} {...file} />
              ))}
            </AnimatePresence>
          </div>
          <ModalAction
            onAttach={() => {
              console.log("files state: ", files);
              const ids = files
                .filter((file) => file.tempId)
                .map((file) => file.tempId);
              if (onUploadFile) onUploadFile(ids);
            }}
            modalRef={dialogRef}
          />
        </div>
      </dialog>
    </>
  );
};

export { UploadModal };
