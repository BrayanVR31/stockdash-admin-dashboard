import { Schema, model } from "mongoose";
import { Image, IImage, imageSchema } from "@/models/image";

// Types
export interface ISupplier extends SocialMedia {
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
  image?: IImage;
  image?: IImage;
  deletedAt: Date;
}

interface Link {
  url: string;
}

interface SocialMedia {
  socialMedia: Link[];
}

const LinkSchema = new Schema<Link>(
  {
    url: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
  }
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
      type: [LinkSchema],
      required: false,
      default: null,
    },
    image: {
      type: imageSchema,
      type: imageSchema,
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
supplierSchema.alias("_id", "id");

// Model
const Supplier = model("Supplier", supplierSchema);

export { Supplier, supplierSchema };
