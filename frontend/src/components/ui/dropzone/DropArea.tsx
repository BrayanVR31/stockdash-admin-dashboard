import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone, ErrorCode } from "react-dropzone";
import { motion } from "motion/react";
import { Upload, FileUp } from "lucide-react";
import { useUploadAreaStore } from "@/store/uploadAreaStore";
import { useMultiUpload } from "@/hooks/useUpload";
import DropCard from "./DropCard";
import MapErrors from "./MapErrors";

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

const DropArea = ({ maxFiles = 1 }: Props) => {
  const files = useUploadAreaStore((state) => state.files);
  const setFiles = useUploadAreaStore((state) => state.setFiles);
  const removeFile = useUploadAreaStore((state) => state.removeFile);
  const { mutate: attachMulti } = useMultiUpload();
  const incomingFiles = useRef<File[]>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!incomingFiles.current) incomingFiles.current = [...acceptedFiles];
      else {
        const droppedFiles = acceptedFiles.filter((droppedFile) => {
          return !incomingFiles.current?.some((incomingFile) => {
            return (
              `${droppedFile.name}${droppedFile.size}` ===
              `${incomingFile.name}${incomingFile.size}`
            );
          });
        });
        if (droppedFiles.length + incomingFiles.current.length <= maxFiles)
          incomingFiles.current = [...incomingFiles.current, ...droppedFiles];
      }
      setFiles(incomingFiles.current);
    },
    [files],
  );

  console.log("drop area: ", files);
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      noClick: true,
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      },
      maxFiles,
      validator: (file) => {
        if (incomingFiles.current?.length === maxFiles)
          return {
            code: ErrorCode.TooManyFiles,
            message: "",
          };
        return null;
      },
    });
  //("Has seleccionado demasiados archivos. Se permiten como máximo ");
  const maxSizeError =
    fileRejections.find(({ _, errors }) =>
      errors.some((e) => e.code === ErrorCode.TooManyFiles),
    )?.errors ?? null;
  const invalidTypeError =
    fileRejections.find(({ _, errors }) =>
      errors.some((e) => e.code === ErrorCode.FileInvalidType),
    )?.errors ?? null;

  useEffect(() => {
    if (incomingFiles.current) {
      if (incomingFiles.current?.length === files.length) {
        attachMulti(files);
        return;
      }
      const syncFiles = files.filter(({ file: droppedFile }) => {
        return incomingFiles.current?.some((incomingFile) => {
          return (
            `${droppedFile?.name}${droppedFile?.size}` ===
            `${incomingFile.name}${incomingFile.size}`
          );
        });
      });
      incomingFiles.current = syncFiles.map((syncFile) => syncFile.file);
    }
  }, [files]);
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
      <MapErrors errors={maxSizeError || invalidTypeError} />
      <div className="flex flex-col gap-y-4">
        {files.map(({ file, tempId, progressValue, status, refId }) => (
          <DropCard
            status={status}
            key={tempId}
            file={file}
            tempId={tempId}
            refId={refId}
            progressValue={progressValue}
            onRemove={() => console.log("deleting the file with id: ", refId)}
          />
        ))}
      </div>
    </>
  );
};

export default DropArea;
