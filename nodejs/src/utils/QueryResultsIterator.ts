import { QueryResults } from "../apis/interfaces/common";

export class QueryResultsIterator<T> {
  private results?: QueryResults<T>;
  private queryParams: Record<string, any>;
  private readonly queryFunc: (queryParams: Record<string, any>) => Promise<QueryResults<T>>;
  isNextCached: boolean;

  constructor(
    queryFunction: (queryParams: Record<string, any>) => Promise<QueryResults<T>>,
    queryParams: Record<string, any>
  ) {
    this.queryFunc = queryFunction;
    this.queryParams = queryParams;
    this.isNextCached = false;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    while (!this.results || this.results?.data) {
      if (this.results?.last) {
        this.queryParams["start"] = this.results?.last;
      }
      this.results = await this.queryFunc(this.queryParams);
      this.isNextCached = true;
      if (this.results.data)
        for (const val of this.results.data) {
          yield val;
        }
      this.isNextCached = false;
    }
  }
}
