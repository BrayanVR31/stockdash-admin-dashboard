import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { ISession, sessionSchema } from ".";

// Type
interface IUser {
  username?: string;
  email: string;
  password: string;
  profile?: {
    name: string;
    lastName: string;
    avatar?: string;
    phoneNumber?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: number;
      country: string;
    };
  };
  sessions?: ISession[];
  roles: string[] | Schema.Types.ObjectId[];
  status?: boolean;
  deletedAt?: Date;
}

// Schema
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
      name: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: false,
      },
      phoneNumber: {
        type: String,
        required: false,
      },
      address: {
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
        required: false,
      },
      required: false,
    },
    sessions: {
      type: sessionSchema,
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
