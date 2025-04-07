import { Schema, model } from "mongoose";

// Types
export interface ISession {
  ipAddress: string;
  userAgent: string;
  userId: Schema.Types.ObjectId;
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
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

// Schema aliases
sessionSchema.alias("_id", "id");

// Model
const Session = model<ISession>("Session", sessionSchema);

export { Session, sessionSchema };
