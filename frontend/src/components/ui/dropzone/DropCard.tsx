import { X } from "lucide-react";
import { formatFileSize } from "@/utils/fileUtils";

interface Props {
  tempId: string;
  file: File;
  onRemove: (tempId: string) => void;
}

const DropCard = ({ tempId, file, onRemove }: Props) => {
  return (
    <div className="relative px-4 py-6 border border-slate-600/40 rounded-box p-2 min-h-18 bg-primary/5">
      <button
        type="button"
        onClick={() => onRemove(tempId)}
        className="btn btn-sm btn-circle btn-soft btn-primary absolute right-4 top-2"
      >
        <X className="w-4" />
      </button>
      <div className="flex items-center gap-x-2 mb-4">
        <div className="w-13 aspect-square border border-slate-600/40 rounded-box flex items-center justify-center">
          x
        </div>
        <div className="w-2/4">
          <p className="text-sm text-neutral-content flex flex-col">
            <span className="font-bold text-sm truncate">{file.name}</span>
            <span className="text-xs">{formatFileSize(file.size)}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <progress className="progress progress-primary" value="32" max="100" />
        <p className="text-xs text-neutral-content">32/100</p>
      </div>
    </div>
  );
};

export default DropCard;
