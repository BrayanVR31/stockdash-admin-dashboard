import {
  useState,
  FormEvent,
  ChangeEvent,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import { useAttachFile } from "@/hooks/use-upload";
import delay from "@/lib/delay";
import { useFiles } from "@/components/ui/drag-and-drop/FilesProvider";
import { PreviewFileSkeleton } from "./PreviewFileSkeleton";
import PreviewFile from "./PreviewFile";

const UploadImage = () => {
  const { setAttachedFiles, attachedFiles, isMulti } = useFiles();
  const { setFile, attachedProgress, attachedFile } = useAttachFile("image");
  // Event handlers
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!attachedFile) return;
    setAttachedFiles([attachedFile]);
    console.log("updating form...");
  };
  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const [inputFile] = event.target.files;
    setFile(inputFile);
  };

  return (
    <form id="upload-form" onSubmit={handleSubmit}>
      <div className="border-dashed border-2 rounded-md px-4 py-6 flex flex-col items-center min-h-40 justify-center">
        <h5 className="font-semibold text-lg">
          Arrastra y suelta o{" "}
          <label className="text-blue-500 hover:text-blue-500/80 transition-colors duration-500 cursor-pointer underline">
            <span>elige las imágenes</span>
            <input
              onChange={handleChangeFile}
              id="image"
              type="file"
              className="hidden"
              multiple={isMulti}
            />
          </label>
        </h5>
        <p className="text-sm text-gray-200 mt-2">
          Formatos soportados: png, jpg, jpeg
        </p>
      </div>
      <PreviewFile file={attachedFile} progress={attachedProgress} />
    </form>
  );
};

export { UploadImage };
