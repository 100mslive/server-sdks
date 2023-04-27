import { APIService } from "../services/APIService";
import { Recording } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class RecordingWrapper {
  private basePath = "/recordings";

  constructor(private apiService: APIService) {}

  list(filters?: Recording.FilterParams): QueryObjectIterator<Recording.Object> {
    const queryResultsIterable = new QueryObjectIterator<Recording.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(objectId: string): Promise<Recording.Object> {
    return this.apiService.get(`${this.basePath}/${objectId}`);
  }

  start(roomId: string, params: Recording.StartParams): Promise<Recording.Object> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  stop(objectId: string): Promise<Recording.Object> {
    return this.apiService.post(`${this.basePath}/${objectId}/stop`, {});
  }

  stopAll(roomId: string): QueryObjectIterator<Recording.Object> {
    const queryResultsIterable = new QueryObjectIterator<Recording.Object>(
      (queryParams: Record<string, any>) =>
        this.apiService.post(`${this.basePath}/room/${roomId}/stop`, queryParams),
      {}
    );
    return queryResultsIterable;
  }
}
