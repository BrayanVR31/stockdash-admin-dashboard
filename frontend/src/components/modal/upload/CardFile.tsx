import { useCallback } from "react";
import { motion } from "motion/react";
import { ImageUp, X } from "lucide-react";
import { ExtendedFile } from "@/types/extendedFiles";
import { useUploadAreaStore } from "@/store/uploadAreaStore";

type Props = ExtendedFile;

const CardFile = ({
  file,
  uploadProgress,
  uploadStatus,
  id,
  tempId,
}: Props) => {
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
            type="button"
            onClick={() => {
              console.log("id: ", tempId);
              removeFile(tempId);
            }}
            className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
          >
            <X className="w-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default CardFile;
