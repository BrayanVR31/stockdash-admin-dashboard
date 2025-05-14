import { create } from "zustand";
import { produce } from "immer";
import expiredSvg from "@/assets/error/expired.svg";
import securitySvg from "@/assets/error/security.svg";
import serverError from "@/assets/error/serverError.svg";

export type SysError =
  | "EXPIRED_SESSION"
  | "ROL_FORBIDDEN"
  | "INTERNAL_SERVER_ERROR"
  | "INVALID_EMAIL"
  | "INVALID_PASSWORD";

export type ResourceError = {
  type: SysError;
  resource: string;
  image: string;
  status: number;
  message: string;
  title: string;
};

const getImgError = (error: SysError) => {
  const imgErrors: Record<SysError, string> = {
    EXPIRED_SESSION: expiredSvg,
    ROL_FORBIDDEN: securitySvg,
    INTERNAL_SERVER_ERROR: serverError,
    INVALID_EMAIL: "",
    INVALID_PASSWORD: "",
  };
  return imgErrors[error];
};

const getStatusError = (error: SysError) => {
  const status: Record<SysError, number> = {
    EXPIRED_SESSION: 401,
    ROL_FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    INVALID_EMAIL: 401,
    INVALID_PASSWORD: 401,
  };
  return status[error];
};

const getMessageError = (error: SysError) => {
  const status: Record<SysError, string> = {
    EXPIRED_SESSION: "",
    ROL_FORBIDDEN:
      "Acceso restringido. Su rol actual no autoriza el uso de esta sección.",
    INTERNAL_SERVER_ERROR:
      "Lamentamos informarle que ha ocurrido un problema al procesar su solicitud",
    INVALID_EMAIL: "El correo eléctronico no existe.",
    INVALID_PASSWORD: "La contraseña de usuario es incorrecta.",
  };
  return status[error];
};

const getTitleError = (error: SysError) => {
  const imgErrors: Record<SysError, string> = {
    EXPIRED_SESSION: "",
    ROL_FORBIDDEN: "Página no autorizada",
    INTERNAL_SERVER_ERROR: "Error del servidor",
    INVALID_EMAIL: "",
    INVALID_PASSWORD: "",
  };
  return imgErrors[error];
};

type SysErrorState = {
  errors: ResourceError[];
};

type SysErrorActions = {
  setSysError: (type: SysError | null, resource: string) => void;
  resetSysErrors: () => void;
};

const useSysErrorStore = create<SysErrorState & SysErrorActions>()((set) => ({
  errors: [],
  setSysError: (type, resource) =>
    set((state) => {
      return produce(state, (draftState) => {
        if (type && !state.errors.some((e) => e.type === type)) {
          draftState.errors.push({
            type,
            resource,
            image: getImgError(type),
            status: getStatusError(type),
            message: getMessageError(type),
            title: getTitleError(type),
          });
        }
      });
    }),
  resetSysErrors: () =>
    set((state) => ({
      ...state,
      errors: [],
    })),
}));

export default useSysErrorStore;
