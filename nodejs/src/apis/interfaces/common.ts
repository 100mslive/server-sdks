export interface QueryResults<T> {
  limit: number;
  data?: T[];
  last?: string;
}
