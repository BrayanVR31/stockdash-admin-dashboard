import { ReactNode, JSX } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { X, Trash2, RefreshCcw } from "lucide-react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Status } from "@/types/extendedFiles";
import { formatFileSize } from "@/utils/fileUtils";

const matchStatusProgress: {
  [key in Status]: {
    border: string;
    progress: string;
  };
} = {
  success: { progress: "bg-emerald-500", border: "border-emerald-600/40" },
  error: { progress: "bg-red-700", border: "border-red-700" },
  idle: { progress: "bg-amber-700", border: "border-slate-600/40" },
  pending: { progress: "bg-primary", border: "border-primary" },
};

interface CardProps {
  children: ReactNode;
  type?: Status;
  onRemove?: () => void;
  onError?: {
    refetch: () => void;
    destroy: () => void;
  };
}

const Card = ({ children, type = "idle", onRemove, onError }: CardProps) => {
  const pendingButton = (
    <button
      type="button"
      onClick={() => null}
      className="btn btn-sm btn-circle btn-soft btn-primary absolute right-4 top-2"
    >
      <X className="w-4" />
    </button>
  );
  const differentButton: {
    [key in Status]: {
      button: JSX.Element;
    };
  } = {
    error: {
      button: (
        <>
          <button
            onClick={() => {
              if (onError?.refetch) onError.refetch();
            }}
            type="button"
            className="btn btn-square rounded-box btn-md btn-primary btn-soft mr-4"
          >
            <RefreshCcw className="w-5.5" />
          </button>
          <button
            onClick={() => {
              if (onError?.destroy) onError.destroy();
            }}
            type="button"
            className="btn btn-square rounded-box btn-md btn-primary btn-soft"
          >
            <Trash2 className="w-5.5" />
          </button>
        </>
      ),
    },
    idle: {
      button: <></>,
    },
    pending: {
      button: <></>,
    },
    success: {
      button: (
        <>
          <button
            onClick={() => {
              if (onRemove) onRemove();
            }}
            type="button"
            className="btn btn-square rounded-box btn-md btn-primary btn-soft"
          >
            <Trash2 className="w-5.5" />
          </button>
        </>
      ),
    },
  };
  return (
    <div
      className={`relative px-4 py-6 border ${matchStatusProgress[type].border} rounded-box p-2 min-h-18 bg-primary/5`}
    >
      {type === "pending" ? (
        pendingButton
      ) : (
        <div className="absolute right-4 top-6">
          {differentButton[type].button}
        </div>
      )}
      {children}
    </div>
  );
};

interface CardProgressProps {
  progressValue?: number;
  type?: Status;
}

const CardProgress = ({
  progressValue = 0,
  type = "idle",
}: CardProgressProps) => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="progress">
        <div
          style={{ width: `${progressValue}%` }}
          className={`${matchStatusProgress[type].progress} h-full transition-all duration-1000`}
        />
      </div>
      <p className="text-xs text-neutral-content">{progressValue}/100</p>
    </div>
  );
};

interface CardPictureProps {
  imageUrl: string;
}

const CardPicture = ({ imageUrl }: CardPictureProps) => {
  return (
    <div className="w-12 aspect-square border border-slate-600/40 rounded-box flex overflow-hidden">
      <LazyLoadImage
        src={imageUrl}
        effect="blur"
        className="h-full w-full object-cover object-center"
        loading="lazy"
      />
    </div>
  );
};

interface CardContentProps {
  children: ReactNode;
}

const CardContent = ({ children }: CardContentProps) => {
  return <div className="flex items-center gap-x-2 mb-4">{children}</div>;
};

interface CardSizeProps {
  fileName: string;
  fileSize: number;
}

const CardSize = ({ fileName, fileSize }: CardSizeProps) => {
  return (
    <div className="w-2/4">
      <p className="text-sm text-neutral-content flex flex-col">
        <span className="font-bold text-sm truncate">{fileName}</span>
        <span className="text-xs">{formatFileSize(fileSize)}</span>
      </p>
    </div>
  );
};

export { Card, CardProgress, CardPicture, CardContent, CardSize };
