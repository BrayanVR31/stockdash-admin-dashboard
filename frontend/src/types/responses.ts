export interface DataResponse<Items> {
  total: number;
  subtotal: number;
  page: number;
  per_page: number;
  results: Items[];
}
