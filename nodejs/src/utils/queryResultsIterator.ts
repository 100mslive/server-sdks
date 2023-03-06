import { QueryResults } from "../apis/interfaces/common";

export class QueryResultsIterator<T> {
  private results!: QueryResults<T>;
  private queryFunc: (queryParams: Record<string, any>) => Promise<QueryResults<T>>;
  private queryParams: Record<string, any>;

  constructor(
    queryFunction: (queryParams: Record<string, any>) => Promise<QueryResults<T>>,
    queryParams: Record<string, any>
  ) {
    this.queryFunc = queryFunction;
    this.queryParams = queryParams;
  }

  async next() {
    if (this.results?.last) {
      this.queryParams["start"] = this.results?.last;
    }
    this.results = await this.queryFunc(this.queryParams);
    return this.results.data ?? [];
  }
}
