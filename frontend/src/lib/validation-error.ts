import { GenericError } from "@/models";

// Types
type ValidationError = GenericError<string>;

/**
 * This function get an error and
 * transform on custom error provided by
 * object key.
 */
function getErrorKey(key: string) {
  const errors: ValidationError = {
    INVALID_PASSWORD: "La contraseña de usuario es inválida.",
    INVALID_EMAIL: "El correo electrónico no existe.",
  };
  return errors[key] || "Ha ocurrido un problema inesperado.";
}

export { getErrorKey };
