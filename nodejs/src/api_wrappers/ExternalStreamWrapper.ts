import { APIService } from "../services/APIService";
import { ExternalStream } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class ExternalStreamWrapper {
  private basePath = "/external-streams";

  constructor(private apiService: APIService) {}

  list(filters?: ExternalStream.FilterParams): QueryObjectIterator<ExternalStream.Object> {
    const queryResultsIterable = new QueryObjectIterator<ExternalStream.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(streamId: string): Promise<ExternalStream.Object> {
    return this.apiService.get(`${this.basePath}/${streamId}`);
  }

  start(roomId: string, params: ExternalStream.StartParams): Promise<ExternalStream.Object> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  stop(streamId: string): Promise<ExternalStream.Object> {
    return this.apiService.post(`${this.basePath}/${streamId}/stop`, {});
  }

  stopAll(roomId: string): QueryObjectIterator<ExternalStream.Object> {
    const queryResultsIterable = new QueryObjectIterator<ExternalStream.Object>(
      (queryParams: Record<string, any>) =>
        this.apiService.post(`${this.basePath}/room/${roomId}/stop`, queryParams),
      {}
    );
    return queryResultsIterable;
  }
}
