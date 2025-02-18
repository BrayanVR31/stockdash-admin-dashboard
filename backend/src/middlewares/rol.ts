import { jwtDecode, JwtPayload } from "jwt-decode";
import { Controller } from "@/types/controller";
import { Rol, IRol } from "@/models/rol";
import { IPermission } from "@/models/permission";
import { User } from "@/models/user";

interface JWTDecoded extends JwtPayload {
  id: string;
}

interface MatchResource {
  [method: string]: string;
}

interface UserRoles extends IRol {
  permissions: IPermission[];
}

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
    // Match each permission depending on method request
    const { method } = request;
    const matchPermissionType = matchedResource[method];
    const { path } = request;

    // Decoded payload from access token
    const cookies = request.cookies;
    const { id } = jwtDecode(cookies["refresh_token"]) as JWTDecoded;
    // Rol based verification
    const user = await User.findById(id).populate("roles");
    const userRoles = user.roles as unknown as UserRoles[];
    const rol = userRoles.find((rol) => roles.includes(rol.name));

    const permission = rol.permissions.find((permission) => {
      if (
        permission.type === "all" &&
        (permission.resource.includes("*") ||
          path.includes(permission.resource))
      )
        return true;
      return (
        permission.type === matchPermissionType &&
        (permission.resource.includes("*") ||
          path.includes(permission.resource))
      );
    });

    if (!rol || !permission)
      return response.status(403).json({
        error: {
          title: "Access denied",
          message: "You don't have permission to access this resource",
          type: "FORBIDDEN",
          code: 403,
        },
      });
    return next();
  };

export { hasAuthorization };
