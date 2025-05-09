import mongoose, { Schema, model, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { ISession, sessionSchema } from ".";
import { IImage, imageSchema } from "@/models/image";

// Type
export interface IUser {
  username?: string;
  email: string;
  password: string;
  profile?: Profile;
  sessions?: ISession[];
  rol: string | Types.ObjectId;
  status?: boolean;
  deletedAt?: Date;
}

interface Profile {
  name: string;
  lastName: string;
  avatar?: IImage;
  phoneNumber?: string;
  address?: Address;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
}

// Schema
const addressSchema = new Schema<Address>(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: false, _id: false },
);

const profileSchema = new Schema<Profile>(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: imageSchema,
      required: false,
      default: null,
    },
    phoneNumber: String,
    address: {
      type: addressSchema,
      required: false,
    },
  },
  { timestamps: false, versionKey: false, _id: false },
);

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
    },
    profile: {
      type: profileSchema,
      default: null,
    },
    sessions: {
      type: [sessionSchema],
      required: false,
      default: null,
    },
    rol: {
      type: Schema.Types.ObjectId,
      ref: "Rol",
    },
    status: {
      type: Boolean,
      required: false,
      default: true,
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Alias fields
userSchema.alias("_id", "id");

// Middlewares
userSchema.pre("save", async function () {
  // Encrypt password on saved document
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(this.password, salt);
  this.password = hashedPass;
});

// Model
const User = model<IUser>("User", userSchema);

export { User };
