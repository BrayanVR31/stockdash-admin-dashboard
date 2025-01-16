interface ResponseError {
  code: number;
  message: string;
  title: string;
  type: string;
}

interface AxiosResponseError {
  [key: string]: ResponseError;
}

export type { AxiosResponseError };
