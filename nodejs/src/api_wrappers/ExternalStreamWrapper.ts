import { APIService } from "../services/APIService";
import { ExternalStream, ExternalStreamFilterParams, ExternalStreamStartParams } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class ExternalStreamWrapper {
  private basePath = "/external-streams";

  constructor(private apiService: APIService) {}

  list(filters?: ExternalStreamFilterParams): QueryObjectIterator<ExternalStream> {
    const queryResultsIterable = new QueryObjectIterator<ExternalStream>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(streamId: string): Promise<ExternalStream> {
    return this.apiService.get(`${this.basePath}/${streamId}`);
  }

  start(roomId: string, params: ExternalStreamStartParams): Promise<ExternalStream> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/start`, params);
  }

  stop(streamId: string): Promise<ExternalStream> {
    return this.apiService.post(`${this.basePath}/${streamId}/stop`, {});
  }

  stopAll(roomId: string): QueryObjectIterator<ExternalStream> {
    const queryResultsIterable = new QueryObjectIterator<ExternalStream>(
      (queryParams: Record<string, any>) =>
        this.apiService.post(`${this.basePath}/room/${roomId}/stop`, queryParams),
      {}
    );
    return queryResultsIterable;
  }
}
