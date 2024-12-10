import { Schema, model } from "mongoose";

// Types
export interface IPermission {
  name: string;
  description: string;
  deletedAt?: Date;
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
permissionSchema.alias("_id", "id");

// Model
const Permission = model<IPermission>("Permission", permissionSchema);

export { Permission, permissionSchema };
