import { Schema, model } from "mongoose";

export type ImageExt = "png" | "jpeg" | "jpg";

export interface IImage {
  path: string;
  extension: ImageExt;
  size: number;
}

const imageSchema = new Schema<IImage>(
  {
    path: { type: String, required: true },
    extension: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

imageSchema.alias("_id", "id");

const Image = model<IImage>("Image", imageSchema);

export { Image };
