import { jwtDecode, JwtPayload } from "jwt-decode";
import { Controller } from "@/types/controller";
import { Rol, IRol } from "@/models/rol";
import { PermissionType } from "@/models/permission";
import { User } from "@/models/user";
import { handleServerError } from "@/utils/error";
import { getServerError, HTTP_STATUS_TYPES } from "@/utils/statusCodes";

export const hasRole =
  (...roles: string[]): Controller =>
  async (req, res, next) => {
    try {
      const cookies = req.cookies;
      const token: string = cookies?.["refresh_token"] || "";
      const _id: string = jwtDecode(token)?.["id"] || "";

      // Check if the user has a rol
      if (!_id) {
        const [status, serverError] = getServerError(
          HTTP_STATUS_TYPES.ROL_FORBIDDEN,
        );
        return res.status(status).json(serverError);
      }

      // Check if the user exists
      const user = await User.findById(_id).populate({
        path: "rol",
        transform: (doc) => doc.name,
      });
      if (!user) {
        const [status, serverError] = getServerError(
          HTTP_STATUS_TYPES.ROL_FORBIDDEN,
        );
        return res.status(status).json(serverError);
      }

      // Match the rol with the roles passed as parameter
      const hasRole = roles.includes(user.rol as string);
      if (!hasRole) {
        const [status, serverError] = getServerError(
          HTTP_STATUS_TYPES.ROL_FORBIDDEN,
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
