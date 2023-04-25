import { APIService } from "../services/APIService";
import {
  LiveStream,
  LiveStreamFilterParams,
  LiveStreamStartParams,
  TimedMetadataParams,
} from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export class LiveStreamService {
  private basePath = "/live-streams";

  constructor(private apiService: APIService) {}

  list(filters?: LiveStreamFilterParams): QueryObjectIterator<LiveStream> {
    const queryResultsIterable = new QueryObjectIterator<LiveStream>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(streamId: string): Promise<LiveStream> {
    return this.apiService.get(`${this.basePath}/${streamId}`);
  }

  start(roomId: string, params: LiveStreamStartParams): Promise<LiveStream> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  sendTimedMetadata(streamId: string, params: TimedMetadataParams): Promise<LiveStream> {
    return this.apiService.post(`${this.basePath}/${streamId}/timed-metadata`, params);
  }

  pauseRecording(streamId: string): Promise<LiveStream> {
    return this.apiService.post(`${this.basePath}/${streamId}/pause-recording`, {});
  }

  resumeRecording(streamId: string): Promise<LiveStream> {
    return this.apiService.post(`${this.basePath}/${streamId}/resume-recording`, {});
  }

  stop(streamId: string): Promise<LiveStream> {
    return this.apiService.post(`${this.basePath}/${streamId}/stop`, {});
  }

  stopAll(roomId: string): QueryObjectIterator<LiveStream> {
    const queryResultsIterable = new QueryObjectIterator<LiveStream>(
      (queryParams: Record<string, any>) =>
        this.apiService.post(`${this.basePath}/room/${roomId}/stop`, queryParams),
      {}
    );
    return queryResultsIterable;
  }
}
