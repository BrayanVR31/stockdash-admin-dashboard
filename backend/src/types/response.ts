export interface JSONResponse<Data> {
  total: number;
  subtotal?: number;
  page?: number;
  per_page?: number;
  results: Data[];
}
