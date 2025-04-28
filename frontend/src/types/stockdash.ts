export type TimeStamps = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type Results<T> = {
  page: number;
  per_page: number;
  results: T[];
  subtotal: number;
  total: number;
};

export type ConfigResults = {
  perPage?: number;
  page?: number;
};
