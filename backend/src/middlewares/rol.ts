import { jwtDecode, JwtPayload } from "jwt-decode";
import { Controller } from "@/types/controller";
import { Rol, IRol } from "@/models/rol";
import { PermissionType } from "@/models/permission";
import { User } from "@/models/user";
import { handleServerError } from "@/utils/error";
import { getServerError, HTTP_STATUS_TYPES } from "@/utils/statusCodes";

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
          "_id -name -description -permissions -deletedAt -createdAt -updatedAt"
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
          `
        )
        .lean();

      if (!userRol) return response.status(403).json(unauthorizedMessage);

      // Match each permission depending on method request
      const { method, path, params } = request;
      const resource = path.replace(`/${params.id}`, "").split("/").join("");
      console.log({ resource, path });

      // When the route has nested subpaths
      const splittedResource = path
        .replace(`/${params.id}`, "")
        .split(/\//)
        .filter((resource) => resource);
      console.log({ resource, splittedResource });
      const permissionKey =
        +splittedResource.length > 1 ? splittedResource.join(".") : resource;
      const permissions = (userRol.rol as unknown as IRol).permissions[
        permissionKey
      ];

      const operation =
        permissions?.["all"] || permissions?.[matchedResource?.[method]];

      if (!permissions || !operation)
        return response.status(403).json(unauthorizedMessage);
      return next();
    } catch (error) {
      console.log("error", error);
      const [status, serverError] = handleServerError(error);
      return response.status(status).json(serverError);
    }
  };

export const hasRole =
  (...roles: string[]): Controller =>
  async (req, res, next) => {
    try {
      const token: string = req.cookies?.["refresh_token"];
      const _id: string = jwtDecode(token)?.["id"];
      const user = await User.findById(_id).populate({
        path: "rol",
        transform: (doc) => doc.name,
      });
      const hasRole = [...roles].some((role) => user?.rol === role);
      // Not authorized role
      if (!hasRole) {
        const [status, serverError] = getServerError(
          HTTP_STATUS_TYPES.ROL_FORBIDDEN
        );
        return res.status(status).json(serverError);
      }
      return next();
    } catch (e) {
      console.log("error", e);
      const [status, serverError] = handleServerError(e);
      return res.status(status).json(serverError);
    }
  };

export { hasAuthorization };
