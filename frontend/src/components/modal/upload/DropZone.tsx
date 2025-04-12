import {
  useState,
  useCallback,
  useRef,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { motion } from "motion/react";
import { FileImage, Folder, FileUp } from "lucide-react";
import { useFileUpload } from "@/hooks/useUpload";
import { useUploadAreaStore } from "@/store/uploadAreaStore";
import { UploadConfig } from "./uploadConfig";

type Props = UploadConfig;
type DropEvent<T> = SyntheticEvent<T> & {
  dataTransfer: DataTransfer;
};

const checkExtension = (name: string, ...extensions: string[]) => {
  return extensions.includes(name.split(".").pop() || "");
};

const convertMB = (bytes: number) => {
  return bytes / 1024 / 1024;
};

const DropZone = ({ limitFiles, limitSize }: Props) => {
  const [isDraggingOver, setDraggingOver] = useState(false);
  const { mutate: attachFile } = useFileUpload();
  const appendFiles = useUploadAreaStore((state) => state.appendFiles);
  const areaFiles = useUploadAreaStore((state) => state.files);
  const addError = useUploadAreaStore((state) => state.addError);
  const hiddenInput = useRef<HTMLInputElement>(null);
  // Event handlers
  const removeDragData = (event: DropEvent<HTMLDivElement>) => {
    const dataTransfer = (event as unknown as InputEvent).dataTransfer;
    if (dataTransfer?.items) {
      dataTransfer.items.clear();
    } else {
      dataTransfer?.clearData();
    }
    setDraggingOver(false);
  };
  const handleDropArea = useCallback((event: DropEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.items) {
      const extensions = ["png", "jpg", "jpeg", "webp"];
      const items = [...event.dataTransfer.items].filter(
        (item) => item.kind === "file",
      );
      const files = items.map((item) => item.getAsFile()!);
      const images = files.filter((file) =>
        checkExtension(file.name, ...extensions),
      );
      appendFiles(files);

      console.log({ items, files, images });
    } else {
      console.log("we have support 'DataTransfer'");
    }
  }, []);

  const handleDragOverArea = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(true);
  };
  const handleDragLeaveArea = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDraggingOver(false);
  };

  const handleSearchFiles = (event: SyntheticEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files || []);
    if (files.length > 0) {
      appendFiles(files);
    }
    if (hiddenInput.current) {
      hiddenInput.current.value = null as unknown as string;
    }
    console.log("area files: ", areaFiles);
    console.log("file value: ", event.currentTarget.files);
    console.log("values: ", event.currentTarget.value);
  };

  return (
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
        <p className="text-lg font-semibold">Arrastra y suelta tus archivos</p>
        <p className="text-sm text-neutral-500">
          Archivos soportados: JPG, PNG, JPEG
        </p>
        <p className="text-sm">o</p>
        <label className="btn btn-sm btn-primary">
          <input
            onChange={handleSearchFiles}
            type="file"
            className="hidden"
            multiple={limitFiles > 1}
            ref={hiddenInput}
          />
          <Folder className="w-3.5" />
          <span>Buscar archivos</span>
        </label>
        <p className="text-xs text-neutral-500">Máximo tamaño: {limitSize}MB</p>
      </div>
    </motion.div>
  );
};

export default DropZone;

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

=====================================================================
if (images.length <= 0)
  addError(
    `Solo se permiten archivos de tipo imagen (${extensions.join(", ")}).`,
  );
else if (images.length > limitFiles)
  addError(
    `No se pueden añadir más archivos. Máximo permitido: ${limitFiles}`,
  );
*/
