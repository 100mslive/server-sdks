import { APIService } from "../services/APIService";
import { QueryResultsIterator } from "../utils/QueryResultsIterator";
import { HMSSession } from "./interfaces/sessionInterfaces";

export class SessionService {
  private basePath = "/sessions";

  constructor(private apiService: APIService) {}

  /**
   *
   * @returns a `QueryResultsIterator<HMSSession>` object
   */
  getAllSessionsIterable(): QueryResultsIterator<HMSSession> {
    const queryResultsIterable = new QueryResultsIterator<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      {}
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

  /**
   *
   * @param roomId Room ID
   * @returns a `QueryResultsIterator<HMSSession>` object
   */
  getSessionsByRoomIdIterable(roomId: string): QueryResultsIterator<HMSSession> {
    const queryResultsIterable = new QueryResultsIterator<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      { room_id: roomId }
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param active Active status of the Session
   * @returns a `QueryResultsIterator<HMSSession>` object
   */
  getSessionsByActiveIterable(active: boolean = true): QueryResultsIterator<HMSSession> {
    const queryResultsIterable = new QueryResultsIterator<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      { active }
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param before Timestamp before which the Session took place
   * @param after Timestamp after which the Session took place
   * @returns a `QueryResultsIterator<HMSSession>` object
   */
  getSessionsByTimeRangeIterable(before?: Date, after?: Date): QueryResultsIterator<HMSSession> {
    const timeQueryParams: Record<string, any> = {};
    if (before) timeQueryParams["before"] = before;
    if (after) timeQueryParams["after"] = after;

    const queryResultsIterable = new QueryResultsIterator<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      timeQueryParams
    );
    return queryResultsIterable;
  }
}
