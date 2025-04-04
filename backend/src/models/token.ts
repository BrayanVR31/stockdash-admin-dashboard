import { Schema, model, Types } from "mongoose";

// Types
interface IToken {
  token: string;
  userId: Schema.Types.ObjectId;
  expiredAt: Date;
}

// Define the schema
const tokenSchema = new Schema<IToken>(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    expiredAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Define the model
const Token = model<IToken>("Token", tokenSchema);

export { Token };
