import {
  useState,
  useCallback,
  useRef,
  SyntheticEvent,
  RefCallback,
  useEffect,
} from "react";
import { FileImage, Upload, Folder, X, FileUp, ImageUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useUploadAreaStore } from "@/store/uploadAreaStore";
import { ExtendedFile } from "@/types/extendedFiles";
import { useFileUpload } from "@/hooks/useUpload";

type UploadedFileProps = ExtendedFile;

const UploadedFile = ({
  file,
  uploadProgress,
  uploadStatus,
  id,
}: UploadedFileProps) => {
  const removeFile = useUploadAreaStore((state) => state.removeFile);
  const getProgressColor = useCallback(() => {
    switch (uploadStatus) {
      case "success":
        return "progress-success";
      case "error":
        return "progress-error";
      case "pending":
        return "progress-primary";
      case "idle":
        return "progress-warning";
    }
  }, [uploadStatus]);

  const mbSize = file.size / 1024 / 1024;
  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className={`card card-side border ${uploadStatus === "success" ? "border-success" : "border-gray-400/50"} `}
      >
        <div className="py-6 px-3">
          <figure className={`w-11 aspect-square rounded-box overflow-hidden `}>
            {uploadStatus === "success" ? (
              <img
                className="w-full h-full object-cover"
                src={`${URL.createObjectURL(file)}`}
                alt="Imagen"
              />
            ) : (
              <div className="bg-neutral-300 flex items-center justify-center">
                <ImageUp className="w-5.5 text-neutral-500" />
              </div>
            )}
          </figure>
        </div>
        <div className="card-body gap-3 relative overflow-hidden">
          <div className="w-[85%]">
            <h6 className="text-sm truncate">{file.name}</h6>
            <span className="text-xs text-neutral-500">
              {mbSize >= 1 ? mbSize.toFixed(1) : (mbSize * 1024).toFixed(1)}
              {mbSize >= 1 ? "MB" : "KB"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div
              className={`progress progress-primary w-full ${getProgressColor()}`}
            >
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${uploadProgress}%`,
                  transition: { duration: 0.75 },
                }}
                className="bg-success h-full"
              />
            </div>
            <span>{uploadProgress}%</span>
          </div>
          <button
            onClick={() => removeFile(id)}
            className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
          >
            <X className="w-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

interface UploadModalProps {
  onUpload?: (files: ExtendedFile[]) => void;
  acceptMultiple?: boolean;
}

const UploadModal = ({
  onUpload,
  acceptMultiple = false,
}: UploadModalProps) => {
  const { mutate } = useFileUpload();
  const files = useUploadAreaStore((state) => state.files);
  const setFiles = useUploadAreaStore((state) => state.appendFiles);
  const removeFile = useUploadAreaStore((state) => state.removeFile);
  const [isDraggingOver, setDraggingOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  /*
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    if (droppedFiles.length > 0) {
      setFiles(droppedFiles);
      const newPreviews = droppedFiles.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  }, []);
  */

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []).filter((file) =>
        file.type.startsWith("image/"),
      );

      if (selectedFiles.length > 0) {
        setFiles(selectedFiles);
        const newPreviews = selectedFiles.map((file) =>
          URL.createObjectURL(file),
        );
        setPreviews(newPreviews);
      }
    },
    [],
  );

  const handleSearchFiles = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      const files = Array.from(event.currentTarget.files || []);
      if (files.length > 0)
        mutate(
          files.map((file) => ({
            file,
            id: `${file.name}${file.size}`,
            uploadStatus: "idle",
            uploadProgress: 0,
          })),
        );
    },
    [],
  );

  const removeDragData = (event: SyntheticEvent<HTMLDivElement>) => {
    const dataTransfer = (event as unknown as InputEvent).dataTransfer;
    if (dataTransfer?.items) {
      dataTransfer.items.clear();
    } else {
      dataTransfer?.clearData();
    }
    setDraggingOver(false);
  };

  const handleDropArea = useCallback(
    (event: SyntheticEvent<HTMLDivElement>) => {
      event.preventDefault();
      const dataTransfer = (event as unknown as InputEvent).dataTransfer;
      // Check if there is some files available on transfer
      if (dataTransfer?.items) {
        const transferFiles = Array.from(dataTransfer.items);
        const onlyFiles = transferFiles.filter(
          (transfer) => transfer.kind === "file",
        );
        const parsedFiles = onlyFiles.map((transfer) =>
          transfer.getAsFile(),
        ) as File[];
        mutate(
          parsedFiles.map((file) => ({
            file,
            id: `${file.name}${file.size}`,
            uploadProgress: 0,
            uploadStatus: "idle",
          })),
        );
      } else {
        const dataFiles = Array.from(dataTransfer!.files);
        mutate(
          dataFiles.map((file) => ({
            file,
            id: `${file.name}${file.size}`,
            uploadProgress: 0,
            uploadStatus: "idle",
          })),
        );
      }
      removeDragData(event);
    },
    [mutate],
  );

  const handleDragOverArea = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(true);
  };

  const handleDragLeaveArea = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(false);
  };

  const handleSubmit = useCallback(() => {
    if (files.length > 0 && onUpload) {
      mutate(files);
    }
  }, [files, onUpload]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleSelectFile = () => {
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    if (files.length > 0 && onUpload) onUpload(files);
  }, [files]);
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
          <button
            onClick={() => dialogRef.current?.close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <X className="w-4" />
          </button>
          <h4 className="font-bold text-xl mb-2">
            Sube tus imagenes en esta sección
          </h4>
          <p>Arrastra y suelta los archivos en el area designada</p>
          {/** Drag & drop area */}
          <motion.div
            animate={{
              borderColor: isDraggingOver ? "#99a1af" : "#3f3eed",
            }}
            onDrop={handleDropArea}
            onDragOver={handleDragOverArea}
            onDragLeave={handleDragLeaveArea}
            className="mt-6 p-6 w-full min-h-32 border-gray-400 border-2 border-dashed rounded-box flex items-center justify-center flex-col relative"
          >
            <motion.div
              animate={{
                opacity: isDraggingOver ? 1 : 0,
                display: isDraggingOver ? "flex" : "none",
              }}
              className={`bg-layer/75 top-0 left-0  absolute backdrop-blur-md rounded-box flex items-center justify-center flex-col w-full h-full`}
            >
              <FileUp className="text-primary animate-bounce" size={55} />
              <h4 className="font-bold text-xl mt-4">Suelta los archivos</h4>
            </motion.div>
            <FileImage className="text-gray-400" size={55} />
            <div className="mt-2 flex flex-col items-center gap-2">
              <p className="text-lg font-semibold">
                Arrastra y suelta tus archivos
              </p>
              <p className="text-sm text-neutral-500">
                Archivos soportados: JPG, PNG, JPEG
              </p>
              <p className="text-sm">o</p>
              <label className="btn btn-sm btn-primary">
                <input
                  onChange={handleSearchFiles}
                  type="file"
                  className="hidden"
                  multiple={acceptMultiple}
                />
                <Folder className="w-3.5" />
                <span>Buscar archivos</span>
              </label>
              <p className="text-xs text-neutral-500">Máximo tamaño: 5MB</p>
            </div>
          </motion.div>
          <div className="mt-6 flex flex-col gap-6">
            {/** File list map array */}
            <AnimatePresence>
              {files.map((file) => (
                <UploadedFile key={file.id} {...file} />
              ))}
            </AnimatePresence>
          </div>
          <div className="modal-action">
            <button
              onClick={() => dialogRef.current?.close()}
              className="btn btn-outline flex-1"
            >
              Cancelar
            </button>
            <button onClick={handleSubmit} className="btn btn-primary flex-1">
              Adjuntar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UploadModal;
