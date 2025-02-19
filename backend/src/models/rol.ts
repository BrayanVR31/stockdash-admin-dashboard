import { Schema, model, SchemaTypes } from "mongoose";
import { IPermission, permissionSchema } from "@/models/permission";

// Types
export interface Permissions {
  [key: string]: IPermission;
}

export type RolType = "admin" | "manager" | "employee";

export interface IRol {
  name: RolType;
  description: string;
  permissions: Permissions;
  deletedAt?: Date;
}

// Schemas
const rolSchema = new Schema<IRol>(
  {
    name: {
      type: String,
      enum: ["admin", "employee", "manager"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    permissions: {
      type: SchemaTypes.Map,
      of: permissionSchema,
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

// Field aliases
rolSchema.alias("_id", "id");

// Model
const Rol = model<IRol>("Rol", rolSchema);

export { Rol, rolSchema };
