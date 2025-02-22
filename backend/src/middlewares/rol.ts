import { jwtDecode, JwtPayload } from "jwt-decode";
import { Controller } from "@/types/controller";
import { Rol, IRol } from "@/models/rol";
import { PermissionType } from "@/models/permission";
import { User } from "@/models/user";

interface JWTDecoded extends JwtPayload {
  id: string;
}

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type MatchResource = {
  [key in HttpMethods]: PermissionType;
};

const matchedResource: MatchResource = {
  GET: "view",
  POST: "create",
  PATCH: "edit",
  PUT: "edit",
  DELETE: "delete",
};

const hasAuthorization =
  (...roles: string[]): Controller =>
  async (request, response, next) => {
    try {
      const unauthorizedMessage = {
        error: {
          title: "Access denied",
          message: "You don't have permission to access this resource",
          type: "FORBIDDEN",
          code: 403,
        },
      };

      // Decoded payload from access token
      const cookies = request.cookies;
      const { id: _id } = jwtDecode(cookies["refresh_token"]) as JWTDecoded;

      // Rol based verification
      const selectedRoles = await Rol.find({ name: { $in: roles } })
        .select(
          "_id -name -description -permissions -deletedAt -createdAt -updatedAt",
        )
        .lean();
      const refRol = selectedRoles.map((rol) => rol._id);
      const userRol = await User.findOne({ _id, rol: { $in: refRol } })
        .populate("rol")
        .select(
          `
            -_id -profile -sessions
            -createdAt -updatedAt -deletedAt
            -status -email -password
          `,
        )
        .lean();
      if (!userRol) return response.status(403).json(unauthorizedMessage);

      // Match each permission depending on method request
      const { method, path } = request;
      const resource = path.split("/").join("");
      const permissions = (userRol.rol as unknown as IRol).permissions[
        resource
      ];
      const operation =
        permissions["all"] || permissions[matchedResource[method]];

      if (!permissions || !operation)
        return response.status(403).json(unauthorizedMessage);
      return next();
    } catch (error) {
      return response.status(500).json({
        error: {
          message: "Server error",
        },
      });
    }
  };

export { hasAuthorization };
