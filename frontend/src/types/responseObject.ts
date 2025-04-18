export interface StockdashResponse<T> {
  results: T[];
  total: number;
  subtotal: number;
  page: number;
  per_page: number;
}

export interface FetchParams {
  pagination?: {
    perPage: number;
    page: number;
  };
}

export interface DataError {
  error: {
    message: string;
    status: number;
    type: string;
  };
}
