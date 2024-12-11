export interface ServerError extends Error {
  status: number;
  title: string;
  jsonKey?: string;
}

interface ResponseErrorFormat {
  title: string;
  message: string;
  code: number;
  type: string;
}

export interface ResponseError {
  [key: string]: ResponseErrorFormat | ResponseErrorFormat[];
}
