import { QueryResults } from "../apis/interfaces/common";

/**
 * An Iterator class that accepts a `queryFunction` and iterates through it
 * asynchronously and yields an object of type `T`.
 * This is to be used for queries like {@link https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/list-rooms List Rooms}
 * that return only a certain number(limit) of objects in one request, and subsequent requests have
 * to be made to completely iterate through it.
 * @internal
 * @example
 * ## Using the Iterable
 * ```ts
 * const randomObjects = createRandomObjectIterable();
 * for await (const randomObj of randomObjects){
 *  console.log(randomObj);
 *  if(randomObjects.isNextCached){
 *    console.log("next randomObj is ready to be consumed")
 *  }
 * }
 * ```
 */
export class HMSQueryObjectIterator<T> {
  private results?: QueryResults<T>;
  private queryParams: Record<string, any>;
  private readonly queryFunction: (queryParams: Record<string, any>) => Promise<QueryResults<T>>;
  isNextCached: boolean;

  constructor(
    queryFunction: (queryParams: Record<string, any>) => Promise<QueryResults<T>>,
    queryParams: Record<string, any>
  ) {
    this.queryFunction = queryFunction;
    this.queryParams = queryParams;
    this.isNextCached = false;
  }

  /**
   * The implementation of `Symbol.asyncIterator` that iteratively runs the
   * `queryFunction` and yields an object of type `T`.
   */
  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    while (!this.results || this.results?.data) {
      if (this.results?.last) {
        this.queryParams["start"] = this.results?.last;
      }
      this.results = await this.queryFunction(this.queryParams);
      this.isNextCached = true;
      if (this.results.data)
        for (let i = 0; i < this.results.data.length; i++) {
          if (i == this.results.data.length - 1) {
            this.isNextCached = false;
          }
          yield this.results.data[i];
        }
    }
  }
}
