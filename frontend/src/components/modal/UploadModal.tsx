import {
  useState,
  useCallback,
  useRef,
  SyntheticEvent,
  RefCallback,
  useEffect,
} from "react";
import { FileImage, Upload, Folder, X, FileUp } from "lucide-react";
import { isDragActive, motion } from "motion/react";
import { useUploadPicture } from "@/hooks/useUpload";

interface UploadedFileProps {
  filename: string;
  size: number;
  picture: File;
  onClose: () => void;
}

const UploadedFile = ({
  filename,
  size,
  picture,
  onClose,
}: UploadedFileProps) => {
  return (
    <div className="card card-side border border-gray-400/50">
      <div className="py-6 px-3">
        <figure className="w-11 aspect-square rounded-box overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`${URL.createObjectURL(picture)}`}
            alt="Imagen"
          />
        </figure>
      </div>
      <div className="card-body gap-3 relative overflow-hidden">
        <div className="w-[85%]">
          <h6 className="text-sm truncate">{filename}</h6>
          <span className="text-xs text-neutral-500">
            {(size / 1024).toFixed(1)}MB
          </span>
        </div>
        <div className="flex items-center gap-4">
          <progress
            className="progress progress-primary w-full"
            value="32"
            max="100"
          />
          <span>32%</span>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
        >
          <X className="w-4" />
        </button>
      </div>
    </div>
  );
};

interface UploadModalProps {
  onUpload?: (files: File[]) => void;
  acceptMultiple?: boolean;
}

const UploadModal = ({
  onUpload,
  acceptMultiple = false,
}: UploadModalProps) => {
  const { mutate: attachFile } = useUploadPicture();
  const [isDraggingOver, setDraggingOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
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
      if (files.length > 0) setFiles([...files]);
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
        const parsedFiles = onlyFiles.map((transfer) => transfer.getAsFile());
        // Type of uploading file depending size
        const singleFile = parsedFiles.find((file) => file !== null);
        const multiFile = [
          ...files,
          ...parsedFiles.filter((file) => file !== null),
        ];

        setFiles(acceptMultiple ? multiFile : singleFile ? [singleFile] : []);
      } else {
        const dataFiles = Array.from(dataTransfer!.files);
        setFiles([...files, ...dataFiles.filter((file) => file !== null)]);
      }
      removeDragData(event);
    },
    [],
  );

  const handleDragOverArea = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(true);
    console.log("drag and over!!");
  };

  const handleDragLeaveArea = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(false);
    console.log("drag and leave!!");
  };

  const handleSubmit = useCallback(() => {
    console.log("attaching files: ", files.length);
    if (files.length > 0 && onUpload) {
      if (acceptMultiple) console.log("");
      else {
        const singleForm = new FormData();
        console.log("sigle form: ", files?.[0]);
        singleForm.append("image", files?.[0]);

        attachFile(singleForm);
      }
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
            {files.map((file, index) => (
              <UploadedFile
                key={file.name}
                filename={file.name}
                size={file.size / 1024}
                picture={file}
                onClose={() =>
                  setFiles(
                    files.filter((_, closeIndex) => index !== closeIndex),
                  )
                }
              />
            ))}
          </div>
          <div className="modal-action">
            <button
              onClick={() => dialogRef.current?.close()}
              className="btn btn-outline flex-1"
            >
              Cancelar
            </button>
            <button onClick={handleSubmit} className="btn btn-primary flex-1">
              Subir
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UploadModal;
