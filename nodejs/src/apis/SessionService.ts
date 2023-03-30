import { APIService } from "../services/APIService";
import { QueryResultsIterator } from "../utils/QueryResultsIterator";
import { HMSSession } from "./interfaces/sessionInterfaces";

export class SessionService {
  private basePath = "/sessions";

  constructor(private apiService: APIService) {}

  /**
   *
   * @param filters Session filters like room id, active status and time range
   * @returns a `QueryResultsIterator<HMSSession>` object
   */
  getSessionsIterable(filters?: HMSSessionFilterOptions): QueryResultsIterator<HMSSession> {
    const queryResultsIterable = new QueryResultsIterator<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param sessionId Session ID
   * @returns a `HMSSession` object
   */
  async getSessionById(sessionId: string): Promise<HMSSession> {
    return this.apiService.get(`${this.basePath}/${sessionId}`);
  }
}

export interface HMSSessionFilterOptions {
  roomId?: string;
  active?: boolean;
  before?: Date;
  after?: Date;
}
