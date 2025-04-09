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
  socialMedia?: SocialMedia;
  image?: string;
  deletedAt: Date;
}

interface SocialMedia {
  facebook?: string;
  tiktok?: string;
  twitter?: string;
}

// Schemas
const socialMediaSchema = new Schema<SocialMedia>(
  {
    facebook: {
      type: String,
      required: false,
      default: null,
    },
    tiktok: {
      type: String,
      required: false,
      default: null,
    },
    twitter: {
      type: String,
      required: false,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
  },
);

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
    },
    contact: {
      phoneNumber: { type: String, required: false },
      email: { type: String, required: false },
    },
    socialMedia: {
      type: socialMediaSchema,
      required: false,
      default: null,
    },
    image: {
      type: String,
      ref: "Image",
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
