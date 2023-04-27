import { APIService } from "../services/APIService";
import { Recording, RecordingFilterParams, RecordingStartParams } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class RecordingWrapper {
  private basePath = "/recordings";

  constructor(private apiService: APIService) {}

  list(filters?: RecordingFilterParams): QueryObjectIterator<Recording> {
    const queryResultsIterable = new QueryObjectIterator<Recording>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(objectId: string): Promise<Recording> {
    return this.apiService.get(`${this.basePath}/${objectId}`);
  }

  start(roomId: string, params: RecordingStartParams): Promise<Recording> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  stop(objectId: string): Promise<Recording> {
    return this.apiService.post(`${this.basePath}/${objectId}/stop`, {});
  }

  stopAll(roomId: string): QueryObjectIterator<Recording> {
    const queryResultsIterable = new QueryObjectIterator<Recording>(
      (queryParams: Record<string, any>) =>
        this.apiService.post(`${this.basePath}/room/${roomId}/stop`, queryParams),
      {}
    );
    return queryResultsIterable;
  }
}
