import APIService from "../services/APIService";
import { ExternalStream, QueryResults } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/external-streams/overview External Stream API} calls.
 */
export default class ExternalStreamWrapper {
  private basePath = "/external-streams";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of external stream objects that satisfy the `filter` params. A
   * `HMS.ExternalStream.Object` iterable is returned that can be iterated with a `for await` loop.
   * @param filters External stream filters like room ID and status
   * @returns a `HMS.QueryObjectIterator<HMS.ExternalStream.Object>` object
   */
  list(filters?: ExternalStream.FilterParams): QueryObjectIterator<ExternalStream.Object> {
    const queryObjectIterable = new QueryObjectIterator<ExternalStream.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryObjectIterable;
  }

  /**
   * Get the details of an external stream by stream id.
   * @param streamId Stream ID
   * @returns a `HMS.ExternalStream.Object` object
   */
  async retrieve(streamId: string): Promise<ExternalStream.Object> {
    return this.apiService.get(`${this.basePath}/${streamId}`);
  }

  /**
   * Start a new external stream in a room.
   * @param roomId Room ID
   * @param params Params to start an external stream
   * @returns a `HMS.ExternalStream.Object` object
   */
  async start(roomId: string, params: ExternalStream.StartParams): Promise<ExternalStream.Object> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  /**
   * Stop an external stream by stream id.
   * @param streamId Stream ID
   * @returns a `HMS.ExternalStream.Object` object
   */
  async stop(streamId: string): Promise<ExternalStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/stop`, {});
  }

  /**
   * Stop all external streams for a room.
   * @param roomId Room ID
   * @returns a `HMS.ExternalStream.Object[]` object
   */
  async stopAll(roomId: string): Promise<ExternalStream.Object[]> {
    const results: QueryResults<ExternalStream.Object> = await this.apiService.post(
      `${this.basePath}/room/${roomId}/stop`,
      {}
    );
    return results.data ?? [];
  }
}
