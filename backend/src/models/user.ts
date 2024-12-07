import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

// Type
interface IUser {
  email: string;
  password: string;
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
