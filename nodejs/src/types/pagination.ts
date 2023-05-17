export interface BasePaginationResults {
  limit?: number;
}

export interface QueryResults<T> extends BasePaginationResults {
  data?: T[];
  last?: string;
}

export interface EventResults<T> extends BasePaginationResults {
  total?: number;
  events?: T[];
  next?: string;
}
