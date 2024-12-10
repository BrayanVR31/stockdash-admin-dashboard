import { Schema, model } from "mongoose";
import { ISupplier, IProduct, supplierSchema, productSchema } from ".";

// Types
export interface IPurchase {
  name: string;
  totalPrice: number;
  totalQuantity: number;
  supplier: ISupplier;
  purchaseDate?: Date;
  products: IProduct[];
  ticketImages?: string[];
  deletedAt?: Date;
}

// Schemas
const purchaseSchema = new Schema<IPurchase>(
  {
    name: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    supplier: {
      type: supplierSchema,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: false,
      default: null,
    },
    products: {
      type: [productSchema],
      required: true,
    },
    ticketImages: {
      type: [String],
      require: false,
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
  },
);

// Field aliases
purchaseSchema.alias("_id", "id");

// Model
const Purchase = model<IPurchase>("Purchase", purchaseSchema);

export { Purchase, purchaseSchema };
