import APIService from "../services/APIService";
import { RoomCode, QueryResults } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/room-codes/room-code-object Room Code API} calls.
 */
export default class RoomCodeWrapper {
  private basePath = "/room-codes";

  constructor(private apiService: APIService) {}

  /**
   * Retrieve room codes for all roles in a room. Use the filters to get room
   * codes for a specific role or only the enabled room codes. A `HMS.RoomCode.Object`
   * iterable is returned that can be iterated with a `for await` loop.
   * @param roomId Room ID
   * @param filters Room Code filters like `enabled` status and `role`
   * @returns a `HMS.QueryObjectIterator<HMS.RoomCode.Object>` object
   */
  list(roomId: string, filters?: RoomCode.FilterParams): QueryObjectIterator<RoomCode.Object> {
    const queryObjectIterable = new QueryObjectIterator<RoomCode.Object>(
      (queryParams: Record<string, any>) =>
        this.apiService.get(`${this.basePath}/room/${roomId}`, queryParams),
      filters
    );
    return queryObjectIterable;
  }

  /**
   * Creates room code for all the roles in the room at once. The created
   * room codes list is returned.
   * @param roomId Room ID
   * @returns a `HMS.RoomCode.Object[]` object
   */
  async create(roomId: string): Promise<RoomCode.Object[]> {
    const results: QueryResults<RoomCode.Object> = await this.apiService.post(
      `${this.basePath}/room/${roomId}`
    );
    return results.data ?? [];
  }

  /**
   * Creates room code for a specific role in the room. The created
   * room code is returned.
   * @param roomId Room ID
   * @param role Role for which the Room Code is to be created
   * @returns a `HMS.RoomCode.Object` object
   */
  async createForRole(roomId: string, role: string): Promise<RoomCode.Object> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/role/${role}`);
  }

  /**
   * Updates the current state for a given room code. This can be used
   * to enable or disable a room code.
   * @param code THe Room Code string
   * @param enabled Enabled status of the Room Code
   * @returns a `HMS.RoomCode.Object` object
   */
  async enableOrDisable(code: string, enabled: boolean): Promise<RoomCode.Object> {
    return this.apiService.post(`${this.basePath}/code`, {
      code,
      enabled,
    });
  }
}
