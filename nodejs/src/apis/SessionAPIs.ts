import { APIService } from "../services/APIService";
import { QueryResultsIterator } from "../utils/queryResultsIterator";
import { HMSSession } from "./interfaces/sessionInterfaces";

export class SessionAPIs {
  private basePath = "/sessions";

  constructor(private apiService: APIService) {}

  async getAllSessionsIterator(): Promise<QueryResultsIterator<HMSSession>> {
    const queryResultsIterator = await QueryResultsIterator.create<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      {}
    );
    return queryResultsIterator;
  }

  async getSessionById(sessionId: string): Promise<HMSSession> {
    return this.apiService.get(`${this.basePath}/${sessionId}`);
  }

  async getSessionsByRoomIdIterator(roomId: string): Promise<QueryResultsIterator<HMSSession>> {
    const queryResultsIterator = await QueryResultsIterator.create<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      { room_id: roomId }
    );
    return queryResultsIterator;
  }

  async getSessionsByActiveIterator(active: boolean): Promise<QueryResultsIterator<HMSSession>> {
    const queryResultsIterator = await QueryResultsIterator.create<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      { active }
    );
    return queryResultsIterator;
  }

  async getSessionsByTimeRangeIterator(
    before?: Date,
    after?: Date
  ): Promise<QueryResultsIterator<HMSSession>> {
    const timeQueryParams: Record<string, any> = {};
    if (before) timeQueryParams["before"] = before;
    if (after) timeQueryParams["after"] = after;

    const queryResultsIterator = await QueryResultsIterator.create<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      timeQueryParams
    );
    return queryResultsIterator;
  }
}
