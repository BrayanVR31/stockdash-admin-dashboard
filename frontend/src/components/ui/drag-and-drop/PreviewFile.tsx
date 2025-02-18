import { X, Image } from "lucide-react";
import { SingleFile } from "@/components/ui/drag-and-drop/file-model";

interface Props {
  progress: number;
  file: SingleFile | null;
}

const PreviewFile = ({ progress = 0, file }: Props) => {
  return (
    <div className="mt-4 border px-6 py-4 rounded-lg dark:border-gray-400">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-x-6">
          <div className="w-16 aspect-square rounded-md overflow-hidden border mb-4">
            {file || progress === 100 ? (
              <img
                className="max-w-full h-full object-cover relative after:absolute after:w-full after:h-full after:bg-gray-400 after:top-0 after:left-0"
                src={`${import.meta.env.VITE_API_URL}:${
                  import.meta.env.VITE_API_PORT
                }/public/images/${file?.path || ""}`}
                alt="success-upload"
              />
            ) : (
              <div className="w-full h-full bg-gray-500/75 animate-pulse flex items-center justify-center">
                <Image className="w-7" />
              </div>
            )}
          </div>
          <div>
            <p className="text-sm line-clamp-1 font-semibold">{file?.path}</p>
            <span className="text-gray-300">
              {file ? Math.ceil((file?.size as number) / 1024) : "Sin archivo"}
            </span>
          </div>
        </div>
        <button onClick={() => console.log("closing...")}>
          <X className="w-4" />
        </button>
      </div>
      <div
        style={{ width: `${progress}%` }}
        className="bg-blue-600 w-0 h-2 rounded-full transition-all duration-700"
      />
    </div>
  );
};

export default PreviewFile;
