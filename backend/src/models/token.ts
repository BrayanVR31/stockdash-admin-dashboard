import { Schema, model } from "mongoose";

// Types
interface IToken {
  token: string;
  userId: string;
  expiredAt: Date;
  startedCount: Date;
}

// Define the schema
const tokenSchema = new Schema<IToken>(
  {
    token: { type: String, required: true },
    userId: { type: String, required: true, ref: "User" },
    expiredAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// Define the model
const Token = model<IToken>("Token", tokenSchema);

export { Token };
