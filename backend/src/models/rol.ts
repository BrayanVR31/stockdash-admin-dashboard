import { Schema, model } from "mongoose";
import { IPermission, permissionSchema } from ".";

// Types
export interface IRol {
  name: string;
  description: string;
  permissions: IPermission[];
  deletedAt?: Date;
}

// Schemas
const rolSchema = new Schema<IRol>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: {
      type: [permissionSchema],
      required: true,
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

// Field aliases
rolSchema.alias("_id", "id");

// Model
const Rol = model<IRol>("Rol", rolSchema);

export { Rol, rolSchema };
