import { Schema, model } from "mongoose";

// Types
export interface ISession {
  ipAddress: string;
  userAgent: string;
}

// Schemas
const sessionSchema = new Schema<ISession>(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: true,
    timestamps: true,
  },
);

// Schema aliases
sessionSchema.alias("_id", "id");

// Model
const Session = model<ISession>("Session", sessionSchema);

export { Session, sessionSchema };
