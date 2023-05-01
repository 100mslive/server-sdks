import APIService from "../services/APIService";
import { LiveStream } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/live-streams/overview Live Stream API} calls.
 */
export default class LiveStreamWrapper {
  private basePath = "/live-streams";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of live stream objects that satisfy the `filter` params. A
   * `HMS.LiveStream.Object` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Live stream filters like room ID and status
   * @returns a `HMS.QueryObjectIterator<HMS.LiveStream.Object>` object
   */
  list(filters?: LiveStream.FilterParams): QueryObjectIterator<LiveStream.Object> {
    const queryObjectIterable = new QueryObjectIterator<LiveStream.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryObjectIterable;
  }

  /**
   * Get the details of a live stream by stream id.
   * @param streamId Stream ID
   * @returns a `HMS.LiveStream.Object` object
   */
  retrieve(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.get(`${this.basePath}/${streamId}`);
  }

  /**
   * Start a new live stream for a room.
   * @param roomId Room ID
   * @param params Params to start a live stream
   * @returns a `HMS.LiveStream.Object` object
   */
  start(roomId: string, params: LiveStream.StartParams): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  /**
   * Send a timed metadata to an existing live stream. The `payload` in params
   * will be set as the metadata in the live stream, after `duration` seconds.
   * @param streamId Stream ID
   * @param params Timed Metadata params
   * @returns a `HMS.LiveStream.Object` object
   */
  sendTimedMetadata(
    streamId: string,
    params: LiveStream.TimedMetadataParams
  ): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/timed-metadata`, params);
  }

  /**
   * Pause recording for a specific live stream.
   * @param streamId Stream ID
   * @returns a `HMS.LiveStream.Object` object
   */
  pauseRecording(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/pause-recording`, {});
  }

  /**
   * Resume recording for a specific live stream.
   * @param streamId Stream ID
   * @returns a `HMS.LiveStream.Object` object
   */
  resumeRecording(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/resume-recording`, {});
  }

  /**
   * Stop live stream by stream id.
   * @param streamId Stream ID
   * @returns a `HMS.LiveStream.Object` object
   */
  stop(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/stop`, {});
  }

  /**
   * Stop all live streams for a room.
   * @param roomId Room ID
   * @returns a `HMS.QueryObjectIterator<HMS.LiveStream.Object>` object
   */
  stopAll(roomId: string): QueryObjectIterator<LiveStream.Object> {
    const queryObjectIterable = new QueryObjectIterator<LiveStream.Object>(
      (queryParams: Record<string, any>) =>
        this.apiService.post(`${this.basePath}/room/${roomId}/stop`, queryParams),
      {}
    );
    return queryObjectIterable;
  }
}
