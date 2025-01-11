import { Schema, model } from "mongoose";

// Types
interface IToken {
  token: string;
  userId: string;
  expiredAt: Date;
}

// Define the schema
const tokenSchema = new Schema<IToken>({
  token: { type: String, required: true },
  userId: { type: String, required: true, ref: "User" },
  expiredAt: { type: Date, required: true },
});

// Define the model
const Token = model<IToken>("Token", tokenSchema);

export { Token };
