import { Schema, model, Types, ObjectId } from "mongoose";

// Types
export interface IPurchase {
  name: string;
  totalPrice: number;
  totalQuantity: number;
  supplier: ObjectId;
  purchaseDate?: Date;
  products: Types.ObjectId[];
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
      type: Types.ObjectId,
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
      type: [String],
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
  },
);

// Field aliases
purchaseSchema.alias("_id", "id");

// Model
const Purchase = model<IPurchase>("Purchase", purchaseSchema);

export { Purchase, purchaseSchema };
