export interface ServerError extends Error {
  status: number;
  title: string;
  jsonKey?: string;
  [nested: string]: any;
}

interface ResponseErrorFormat {
  title: string;
  message: string;
  code: number;
  type: string;
  errors?: any;
}

export interface ResponseError {
  [key: string]: ResponseErrorFormat | ResponseErrorFormat[];
}
