import alertSvg from "@/assets/alert.svg";
import { ErrorDescription, ResponseError } from "@/types/error";

export const matchErrorResponse: Record<ResponseError, ErrorDescription> = {
  FORBIDDEN: {
    description: "No tienes permisos para realizar esta acción.",
    title: "Acceso denegado",
    image: alertSvg,
    statusCode: 403,
  },
  EXPIRED_SESSION: {
    description:
      "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión para continuar.",
    title: "Sesión expirada",
    image: alertSvg,
    statusCode: 401,
  },
};
