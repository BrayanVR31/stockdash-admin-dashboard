interface PaginatedResponse<DataType> {
  results: ExtendModel<DataType>[];
  total: number;
  subtotal: number;
  page: number;
  per_page: number;
}

interface BaseModel {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

type ExtendModel<T> = BaseModel & T;

export type { PaginatedResponse, ExtendModel as SingleResponse };
