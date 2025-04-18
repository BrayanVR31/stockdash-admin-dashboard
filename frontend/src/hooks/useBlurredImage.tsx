import { useState, useEffect, useRef } from "react";

const useBlurredImage = (
  lowQuality: string,
  highQuality: string,
): [string, { isBlurred: boolean }] => {
  const [src, setSrc] = useState(lowQuality);
  const image = useRef<HTMLImageElement>(null);
  useEffect(() => {
    console.log({ lowQuality, highQuality });
    setSrc(lowQuality);

    if (!image.current) image.current = new Image();
    image.current.src = highQuality;

    image.current.onload = () => {
      console.log("onload image");
      setSrc(highQuality);
    };
  }, []);
  return [src, { isBlurred: src === lowQuality }];
};

export { useBlurredImage };
