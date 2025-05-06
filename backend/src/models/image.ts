import { Schema, model } from "mongoose";

export type ImageExt = "png" | "jpeg" | "jpg";

export interface IImage {
  path: string;
  extension: string;
  size: number;
  refId: string;
}

export const imageSchema = new Schema<IImage>(
  {
    path: {
      type: String,
      required: true,
    },
    extension: { type: String, required: true },
    size: { type: Number, required: true },
    refId: { type: String, required: true },
  },
  { versionKey: false, timestamps: true, autoCreate: false }
);

imageSchema.alias("_id", "id");

const Image = model<IImage>("Image", imageSchema);

export { Image };
