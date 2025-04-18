import { useState, useEffect, useRef } from "react";
import { X, Trash2, RefreshCcw } from "lucide-react";
import { decode, encode } from "blurhash";
import { formatFileSize } from "@/utils/fileUtils";
import { ExtendedFile, Status } from "@/types/extendedFiles";
import {
  useDestroyUpload,
  useRefreshUpload,
  useStoredFile,
  usePersistentFile,
} from "@/hooks/useUpload";
import { useBlurredImage } from "@/hooks/useBlurredImage";
import { encodeImageToBlurHash, getImageData } from "@/utils/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { lazy, Suspense } from "react";
import { Card, CardProgress, CardPicture, CardContent, CardSize } from "./Card";

interface Props extends ExtendedFile {
  onRemove?: () => void;
}

const ExistingCard = lazy(() => import("./ExistingCard"));

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

const DropCard = ({
  tempId,
  file,
  progressValue = 0,
  onRemove,
  status,
  refId,
}: Props) => {
  console.log("incoming file: ", { tempId, refId, file });
  const { mutate: destroyFile } = useDestroyUpload(tempId);
  const { mutate: refreshUpload } = useRefreshUpload();

  const urlImage = useRef<string>(null);

  const handleRemove = () => {
    if (onRemove) onRemove();
    if (refId) destroyFile(refId);
    if (urlImage.current) URL.revokeObjectURL(urlImage.current);
  };

  useEffect(() => {
    if (file && !urlImage.current) urlImage.current = URL.createObjectURL(file);
  }, []);

  if (!file && refId)
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ExistingCard id={refId} tmpId={tempId} />
      </Suspense>
    );
  return (
    <Card
      onRemove={handleRemove}
      onError={{
        refetch: () => {
          refreshUpload(tempId!);
        },
        destroy: () => null,
      }}
      type={status}
    >
      <CardContent>
        <CardPicture imageUrl={urlImage.current!} />
        <CardSize fileName={file!.name} fileSize={file!.size} />
      </CardContent>
      <CardProgress type={status} progressValue={progressValue} />
    </Card>
  );
};

export default DropCard;
