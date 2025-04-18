import { encode } from "blurhash";

const loadImage = async (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.width = 200;
    image.height = 200;
    console.log("promise: ", image);
    image.onload = () => resolve(image);
    image.onerror = (...args) => reject(args);
    image.src = src;
  });
};

export const getImageData = (image: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  context?.drawImage(image, 0, 0);
  return context?.getImageData(0, 0, image.width, image.height);
};

export const encodeImageToBlurHash = async (urlImage: string) => {
  const image = await loadImage(urlImage);
  const imageData = getImageData(image);
  return encode(imageData!.data, imageData!.width, imageData!.height, 4, 4);
};
