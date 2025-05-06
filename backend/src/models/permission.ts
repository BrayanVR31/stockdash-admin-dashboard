import { Schema, model } from "mongoose";

// Types
export type PermissionType = "create" | "read" | "update" | "delete";

export type IPermission = {
  title: string;
  action: PermissionType;
  description?: string;
  resource: string;
};

// Schemas
const permissionSchema = new Schema<IPermission>(
  {
    title: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ["create", "read", "update", "delete"],
    },
    description: {
      type: String,
      required: false,
    },
    resource: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
    autoCreate: false,
  }
);

// Field aliases
// permissionSchema.alias("_id", "id");

// Model
const Permission = model<IPermission>("Permission", permissionSchema);

export { Permission, permissionSchema };
