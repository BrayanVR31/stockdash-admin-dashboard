import { Schema, model, InferRawDocType } from "mongoose";

// Types
export interface ICategory {
  name: string;
}

// Schemas
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Field aliases
categorySchema.alias("_id", "id");

// Model
const Category = model<ICategory>("Category", categorySchema);

export { Category, categorySchema };
