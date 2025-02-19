import { Schema, model } from "mongoose";

// Types
export type PermissionType = "all" | "view" | "edit" | "delete" | "create";

export type IPermission = { [key in PermissionType]: boolean };

// Schemas
const permissionSchema = new Schema<IPermission>(
  {
    all: {
      type: Boolean,
      required: false,
    },
    view: {
      type: Boolean,
      required: false,
    },
    edit: {
      type: Boolean,
      required: false,
    },
    create: {
      type: Boolean,
      required: false,
    },
    delete: {
      type: Boolean,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
    _id: false,
  }
);

// Field aliases
// permissionSchema.alias("_id", "id");

// Model
const Permission = model<IPermission>("Permission", permissionSchema);

export { Permission, permissionSchema };
