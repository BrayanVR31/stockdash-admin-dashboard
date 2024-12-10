import { Schema, model } from "mongoose";
import { IProduct, productSchema } from ".";

// Types
type SaleStatus = "completed" | "pending" | "canceled";

export interface ISale {
  products: IProduct[];
  totalAmount: number;
  saleDate?: Date;
  user: string | Schema.Types.ObjectId;
  status?: SaleStatus;
  deletedAt?: Date;
}

// Schemas
const saleSchema = new Schema<ISale>(
  {
    products: {
      type: [productSchema],
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    saleDate: {
      type: Date,
      required: false,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: false,
      default: "pending",
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

// Field aliases
saleSchema.alias("_id", "id");

// Model
const Sale = model<ISale>("Sale", saleSchema);

export { Sale, saleSchema };
