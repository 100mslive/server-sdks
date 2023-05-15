import APIService from "../services/APIService";
import { logger } from "../services/LoggerService";
import { QueryResults, Session } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object Session API} calls.
 */
export default class SessionWrapper {
  private basePath = "/sessions";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of session objects that satisfy the `filter` params. To get
   * all the sessions related to your account, don't pass in any param. And similarly,
   * specify the `room_id` in filters to get the sessions of a specific room. A
   * `HMS.Session.Object` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Session filters like room id, active status and time range
   * @returns a `HMS.QueryObjectIterator<HMS.Session.Object>` object
   */
  list(filters?: Session.FilterParams): QueryObjectIterator<Session.Object> {
    const queryObjectIterable = new QueryObjectIterator<Session.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryObjectIterable;
  }

  /**
   * Get the session object by it's session id.
   * @param sessionId Session ID
   * @returns a `HMS.Session.Object` object
   */
  async retrieveById(sessionId: string): Promise<Session.Object> {
    return this.apiService.get(`${this.basePath}/${sessionId}`);
  }

  /**
   * Get the active session in a room. Throws an error if there's no active session in the
   * specified room, so use this with a `try-catch` block.
   * @param roomId Room ID
   * @returns
   */
  async retrieveActiveByRoom(roomId: string): Promise<Session.Object> {
    const results: QueryResults<Session.Object> = await this.apiService.get(this.basePath, {
      room_id: roomId,
      active: true,
    });
    if (!results.data || results.data.length === 0) {
      const err = new Error(`No active Session found in the room with id - ${roomId}`);
      logger.error("No active Session found", err);
      throw err;
    }
    return results.data[0];
  }
}
