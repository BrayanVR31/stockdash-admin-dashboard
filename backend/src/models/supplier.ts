import { Schema, model } from "mongoose";

// Types
export interface ISupplier {
  name: string;
  address?: {
    street: string;
    state: string;
    zipCode: number;
    neighborhood: string;
  };
  contact?: {
    phoneNumber?: string;
    email?: string;
  };
  socialMedia?: string[];
  image?: string;
  deletedAt: Date;
}

// Schemas
const supplierSchema = new Schema<ISupplier>(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      zipCode: {
        type: Number,
        required: false,
      },
      neighborhood: {
        type: String,
        required: false,
      },
      default: null,
    },
    contact: {
      phoneNumber: { type: String, required: false },
      email: { type: String, required: false },
      default: null,
    },
    socialMedia: {
      type: [String],
      required: false,
      default: null,
    },
    image: {
      type: String,
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
supplierSchema.alias("_id", "id");

// Model
const Supplier = model("Supplier", supplierSchema);

export { Supplier, supplierSchema };
