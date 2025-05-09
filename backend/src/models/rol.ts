import mongoose, { Schema, model, SchemaTypes, Types } from "mongoose";
import { IPermission, permissionSchema } from "@/models/permission";

// Types
export interface Permissions {
  [key: string]: IPermission;
}

export type RolType = "admin" | "manager" | "employee";

export interface IRol {
  name: RolType;
  description: string;
  permissions: IPermission[];
  deletedAt?: Date;
}

// Schemas
const rolSchema = new Schema<IRol>(
  {
    name: {
      type: String,
      enum: ["admin", "employee", "manager"],
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: {
      type: [permissionSchema],
      ref: "Permission",
    },
    deletedAt: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
    statics: {
      findRolByName(name: string) {
        return this.find({ name: new RegExp(name, "i") }).select("_id");
      },
    },
  }
);

// Field aliases
rolSchema.alias("_id", "id");

// Model
const Rol = model<IRol>("Rol", rolSchema, "roles");

export { Rol, rolSchema };
