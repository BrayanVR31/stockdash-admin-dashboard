import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { ISession, sessionSchema } from ".";

// Type
interface IUser {
  username?: string;
  email: string;
  password: string;
  profile?: Profile;
  sessions?: ISession[];
  roles: string[] | Schema.Types.ObjectId[];
  status?: boolean;
  deletedAt?: Date;
}

interface Profile {
  name: string;
  lastName: string;
  avatar?: string;
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
  { versionKey: false, timestamps: false, _id: false }
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
    avatar: String,
    phoneNumber: String,
    address: {
      type: addressSchema,
      required: false,
    },
  },
  { timestamps: false, versionKey: false, _id: false }
);

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
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
    roles: {
      type: [Schema.Types.ObjectId],
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
    versionKey: false,
    timestamps: true,
  }
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
