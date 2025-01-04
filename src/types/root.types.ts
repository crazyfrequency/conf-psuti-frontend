export interface IBase {
  id: number;
}

export type TResponse<T> = T | "error" | null

export type TPagination = {
  page: number;
  limit: number;
}
