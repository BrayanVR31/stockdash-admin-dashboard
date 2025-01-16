import { GenericError } from "@/models";

// Types
type ValidationError = GenericError<string>;

/**
 * This function get an error and
 * transform on custom error provided by
 * object key.
 */
function getValidationError() {
  const errors: ValidationError = {
    AUTHENTICATION_FAILED: "",
  };
}
