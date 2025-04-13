import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "motion/react";
import { Upload, FileUp } from "lucide-react";
import DropCard from "./DropCard";
import { v4 as uuidv4 } from "uuid";

const transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
  mass: 0.8,
};

const variants = {
  initial: {
    scale: 1,
    borderColor: "var(--color-slate-600)",
    boxShadow: "0 0 0 0 rgba(var(--color-primary), 0)",
  },
};

interface Props {
  maxFiles?: number;
}

interface ExtendedFile {
  file: File;
  tempId: string;
}

const DropArea = ({ maxFiles = 1 }: Props) => {
  const [files, setFiles] = useState<ExtendedFile[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log({ files, acceptedFiles });
    if (files.length + acceptedFiles.length > maxFiles) return;
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) => ({
        file,
        tempId: uuidv4(),
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      noClick: true,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      },
      maxFiles,
    });

  return (
    <>
      <motion.div
        className="w-full"
        initial={variants.initial}
        animate={{
          scale: !isDragActive ? 1 : 0.975,
        }}
        transition={transition}
      >
        <section
          className={`flex flex-col justify-center items-center min-w-full min-h-72 rounded-box border-2 border-dashed mb-4 ${
            isDragActive
              ? "bg-primary/10 border-blue-600"
              : "bg-base-100 border-slate-600/60"
          } transition-colors duration-500`}
          {...getRootProps()}
        >
          <p className="flex-none flex flex-col justify-center items-center mb-4">
            <FileUp
              className={`${
                isDragActive
                  ? "animate-bounce text-primary"
                  : "text-slate-500/80"
              }`}
              size={35}
            />
            <span className="mt-2 text-sm">
              {isDragActive
                ? "Suelta los archivos ahora"
                : "Arrastra y suelta tus archivos aquí o"}
            </span>
          </p>
          <label className="btn btn-sm btn-outline btn-primary">
            <input {...getInputProps()} />
            <Upload className="w-4" />
            <span>Elige tus archivos</span>
          </label>
        </section>
      </motion.div>
      <p className="mb-10 text-sm text-neutral-content flex justify-between">
        <span>
          Formato soportado: <b>png, jpg, jpeg, webp</b>
        </span>
        <span>
          Tamaño máximo: <b>2MB</b>
        </span>
      </p>
      <div className="flex flex-col gap-y-4">
        {files.map(({ file, tempId }) => (
          <DropCard
            key={tempId}
            file={file}
            tempId={tempId}
            onRemove={() =>
              setFiles((prev) => prev.filter((f) => f.tempId !== tempId))
            }
          />
        ))}
      </div>
    </>
  );
};

export default DropArea;
