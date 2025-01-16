interface GenericError<T> {
  [errorType: string]: T;
}

export type { GenericError };
