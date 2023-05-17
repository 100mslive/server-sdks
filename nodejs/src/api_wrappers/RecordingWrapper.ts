import APIService from "../services/APIService";
import { QueryResults, Recording } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/recordings/overview Recording API} calls.
 */
export default class RecordingWrapper {
  private basePath = "/recordings";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of recording objects that satisfy the `filter` params. A
   * `HMS.Recording.Object` iterable is returned that can be iterated with a `for await` loop.
   * @param filters recording filters like room ID and status
   * @returns a `HMS.QueryObjectIterator<HMS.Recording.Object>` object
   */
  list(filters?: Recording.FilterParams): QueryObjectIterator<Recording.Object> {
    const queryObjectIterable = new QueryObjectIterator<Recording.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters
    );
    return queryObjectIterable;
  }

  /**
   * Get the details of a recording by its object id.
   * @param objectId Object ID
   * @returns a `HMS.Recording.Object` object
   */
  async retrieve(objectId: string): Promise<Recording.Object> {
    return this.apiService.get(`${this.basePath}/${objectId}`);
  }

  /**
   * Start a new recording in a room.
   * @param roomId Room ID
   * @param params Params to start a room recording
   * @returns a `HMS.Recording.Object` object
   */
  async start(roomId: string, params: Recording.StartParams): Promise<Recording.Object> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  /**
   * Stop a specific recording by its object id.
   * @param objectId Object ID
   * @returns a `HMS.Recording.Object` object
   */
  async stop(objectId: string): Promise<Recording.Object> {
    return this.apiService.post(`${this.basePath}/${objectId}/stop`);
  }

  /**
   * Stop all recordings in a room.
   * @param roomId Room ID
   * @returns a `HMS.Recording.Object[]` object
   */
  async stopAll(roomId: string): Promise<Recording.Object[]> {
    const results: QueryResults<Recording.Object> = await this.apiService.post(
      `${this.basePath}/room/${roomId}/stop`
    );
    return results.data ?? [];
  }
}
