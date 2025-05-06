import { Schema, model, Types } from "mongoose";
import { IImage, imageSchema } from "@/models/image";

// Types
export interface IProduct {
  name: string;
  categories?: Types.ObjectId[];
  price: {
    purchase: number;
    sale: number;
  };
  description?: string;
  quantity?: number;
  suppliers: Types.ObjectId[];
  images: IImage[];
  status: boolean;
  deletedAt?: Date;
}

// Schemas
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    categories: {
      type: [Types.ObjectId],
      required: false,
      default: null,
      ref: "Category",
    },
    price: {
      purchase: {
        type: Number,
        required: true,
      },
      sale: {
        type: Number,
        required: true,
      },
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    quantity: {
      type: Number,
      required: false,
      default: 0,
    },
    suppliers: {
      type: [Types.ObjectId],
      ref: "Supplier",
      required: true,
    },
    images: {
      type: [imageSchema],
      required: false,
      default: null,
    },
    status: {
      type: Boolean,
      required: true,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Field aliases
productSchema.alias("_id", "id");

// Middlewares
productSchema.post("save", function (document) {
  console.log("post middleware is executing...");
  console.log(document);
});

// Model
const Product = model<IProduct>("Product", productSchema);

export { Product, productSchema };
