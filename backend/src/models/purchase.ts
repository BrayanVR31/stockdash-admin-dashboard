import { Schema, model, Types, ObjectId } from "mongoose";
import { IImage, imageSchema } from "@/models/image";

// Types
export interface IPurchase {
  totalPrice: number;
  totalQuantity: number;
  supplier: Types.ObjectId;
  purchaseDate?: Date;
  products: Types.ObjectId[];
  ticketImages?: IImage[];
  deletedAt?: Date;
}

// Schemas
const purchaseSchema = new Schema<IPurchase>(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: false,
      default: null,
    },
    products: {
      type: [Types.ObjectId],
      ref: "Product",
      required: true,
    },
    ticketImages: {
      type: [imageSchema],
      required: false,
      default: null,
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
purchaseSchema.alias("_id", "id");

// Model
const Purchase = model<IPurchase>("Purchase", purchaseSchema);

export { Purchase, purchaseSchema };
