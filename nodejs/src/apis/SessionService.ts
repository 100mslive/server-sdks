import { APIService } from "../services/APIService";
import { HMSSession, HMSSessionFilterOptions } from "../types";
import { HMSQueryObjectIterator } from "../utils/HMSQueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object Session API} calls.
 */
export class SessionService {
  private basePath = "/sessions";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of session objects that satisfy the `filter` options. To get
   * all the sessions related to your account, don't pass in any param. And similarly,
   * specify the `room_id` in filters to get the sessions of a specific room. A
   * `HMSSession` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Session filters like room id, active status and time range
   * @returns a `HMSQueryObjectIterator<HMSSession>` object
   */
  getSessionsIterable(filters?: HMSSessionFilterOptions): HMSQueryObjectIterator<HMSSession> {
    const queryResultsIterable = new HMSQueryObjectIterator<HMSSession>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   * Get the session object by it's session id.
   * @param sessionId Session ID
   * @returns a `HMSSession` object
   */
  async getSessionById(sessionId: string): Promise<HMSSession> {
    return this.apiService.get(`${this.basePath}/${sessionId}`);
  }
}
