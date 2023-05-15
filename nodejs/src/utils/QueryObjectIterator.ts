import { EventResults, QueryResults } from "../types";

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
export class QueryObjectIterator<T> {
  private results?: QueryResults<T> | EventResults<T>;
  private queryParams: Record<string, any>;
  private readonly queryFunction: (
    queryParams: Record<string, any>
  ) => Promise<QueryResults<T> | EventResults<T>>;
  isNextCached: boolean;

  constructor(
    queryFunction: (queryParams: Record<string, any>) => Promise<QueryResults<T> | EventResults<T>>,
    queryParams?: Record<string, any>
  ) {
    this.queryFunction = queryFunction;
    this.queryParams = queryParams ?? {};
    this.isNextCached = false;
  }

  /**
   * The implementation of `Symbol.asyncIterator` that iteratively runs the
   * `queryFunction` and yields an object of type `T`.
   */
  async *[Symbol.asyncIterator](): AsyncIterator<T> {
    // if first iteration (results is undefined) or latest query returned data
    while (
      !this.results ||
      (this.results as QueryResults<T>)?.data ||
      (this.results as EventResults<T>)?.events
    ) {
      let data =
        (this.results as QueryResults<T>)?.data ?? (this.results as EventResults<T>)?.events;

      // set "last" of latest query as "start" for current query
      if ((this.results as QueryResults<T>)?.last || (this.results as EventResults<T>)?.next) {
        this.queryParams.start =
          (this.results as QueryResults<T>)?.last ?? (this.results as EventResults<T>)?.next;
      }
      // call query function and set `isNextCached` to true
      this.results = await this.queryFunction(this.queryParams);
      this.isNextCached = true;
      if (data) {
        // iterate through returned data if present and yield it
        for (let i = 0; i < data.length; i++) {
          // before yielding the last element in data, set `isNextCached` to false
          if (i == data.length - 1) {
            this.isNextCached = false;
          }
          yield data[i];
        }
        // if returned data count is less than specified `limit` or default 10
        // or `null` or an empty string, then break the loop
        // since the final page has been reached
        if (
          data.length < (this.queryParams.limit ?? 10) ||
          (this.results as QueryResults<T>).last == null ||
          (this.results as QueryResults<T>).last == ""
        )
          break;
      }
    }
  }
}
