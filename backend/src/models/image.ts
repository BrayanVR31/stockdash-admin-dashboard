import { Schema, model } from "mongoose";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { destinationPath } from "@/config/multer";
import { removeFile } from "@/utils/file";

export type ImageExt = "png" | "jpeg" | "jpg";

export interface IImage {
  path: string;
  extension: ImageExt;
  size: number;
}

const imageSchema = new Schema<IImage>(
  {
    path: {
      type: String,
      required: true,
    },
    extension: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true },
);

imageSchema.alias("_id", "id");

imageSchema.post("findOneAndDelete", async function (doc) {
  await removeFile(doc?.path, "images");
});

const Image = model<IImage>("Image", imageSchema);

export { Image };
