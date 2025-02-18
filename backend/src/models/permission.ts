import { Schema, model } from "mongoose";

// Types
export interface IPermission {
  name: string;
  description: string;
  resource: string;
  type: string;
}

// Schemas
const permissionSchema = new Schema<IPermission>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["create", "edit", "view", "delete"],
      required: true,
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
