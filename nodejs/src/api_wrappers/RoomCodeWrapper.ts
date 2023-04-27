import { APIService } from "../services/APIService";
import { RoomCode, RoomCodeFilterOptions, QueryResults } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class RoomCodeWrapper {
  private basePath = "/room-codes";

  constructor(private apiService: APIService) {}

  /**
   * Retrieve room codes for all roles in a room. Use the filters to get room
   * codes for a specific role or only the enabled room codes. A `HMS.RoomCode`
   * iterable is returned that can be iterated with a `for await` loop.
   * @param roomId Room ID
   * @param filters Room Code filters like `enabled` status and `role`
   * @returns a `HMS.QueryObjectIterator<HMS.RoomCode>` object
   */
  list(roomId: string, filters?: RoomCodeFilterOptions): QueryObjectIterator<RoomCode> {
    const queryResultsIterable = new QueryObjectIterator<RoomCode>(
      (queryParams: Record<string, any>) =>
        this.apiService.get(`${this.basePath}/room/${roomId}`, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   * Creates room code for all the roles in the room at once. The created
   * room codes list is returned.
   * @param roomId Room ID
   * @returns a `RoomCode[]` object
   */
  async create(roomId: string): Promise<RoomCode[]> {
    const results: QueryResults<RoomCode> = await this.apiService.post(
      `${this.basePath}/room/${roomId}`,
      {}
    );
    return results.data ?? [];
  }

  /**
   * Creates room code for a specific role in the room. The created
   * room code is returned.
   * @param roomId Room ID
   * @param role Role for which the Room Code is to be created
   * @returns a `RoomCode` object
   */
  async createForRole(roomId: string, role: string): Promise<RoomCode> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/role/${role}`, {});
  }

  /**
   * Updates the current state for a given room code. This can be used
   * to enable or disable a room code.
   * @param code THe Room Code string
   * @param enabled Enabled status of the Room Code
   * @returns a `RoomCode` object
   */
  async enableOrDisable(code: string, enabled: boolean): Promise<RoomCode> {
    return this.apiService.post(`${this.basePath}/code`, {
      code,
      enabled,
    });
  }
}
