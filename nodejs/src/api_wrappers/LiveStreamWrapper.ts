import APIService from "../services/APIService";
import { LiveStream } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class LiveStreamWrapper {
  private basePath = "/live-streams";

  constructor(private apiService: APIService) {}

  list(filters?: LiveStream.FilterParams): QueryObjectIterator<LiveStream.Object> {
    const queryResultsIterable = new QueryObjectIterator<LiveStream.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.get(`${this.basePath}/${streamId}`);
  }

  start(roomId: string, params: LiveStream.StartParams): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  sendTimedMetadata(
    streamId: string,
    params: LiveStream.TimedMetadataParams
  ): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/timed-metadata`, params);
  }

  pauseRecording(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/pause-recording`, {});
  }

  resumeRecording(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/resume-recording`, {});
  }

  stop(streamId: string): Promise<LiveStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/stop`, {});
  }

  stopAll(roomId: string): QueryObjectIterator<LiveStream.Object> {
    const queryResultsIterable = new QueryObjectIterator<LiveStream.Object>(
      (queryParams: Record<string, any>) =>
        this.apiService.post(`${this.basePath}/room/${roomId}/stop`, queryParams),
      {}
    );
    return queryResultsIterable;
  }
}
