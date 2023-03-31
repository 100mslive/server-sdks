import { APIService } from "../services/APIService";
import { RoomCode, RoomCodeFilterOptions, QueryResults } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export class RoomCodeService {
  private basePath = "/room-codes";

  constructor(private apiService: APIService) {}

  /**
   *
   * @param roomId Room ID
   * @param filters Room Code filters like `enabled` status and `role`
   * @returns a `HMS.QueryObjectIterator<HMS.RoomCode>` object
   */
  getRoomCodesIterable(
    roomId: string,
    filters?: RoomCodeFilterOptions
  ): QueryObjectIterator<RoomCode> {
    const queryResultsIterable = new QueryObjectIterator<RoomCode>(
      (queryParams: Record<string, any>) =>
        this.apiService.get(`${this.basePath}/room/${roomId}`, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param roomId Room ID
   * @returns a `RoomCode[]` object
   */
  async createRoomCodes(roomId: string): Promise<RoomCode[]> {
    const results: QueryResults<RoomCode> = await this.apiService.post(
      `${this.basePath}/room/${roomId}`,
      {}
    );
    return results.data ?? [];
  }

  /**
   *
   * @param roomId Room ID
   * @param role Role for which the Room Code is to be created
   * @returns a `RoomCode` object
   */
  async createRoomCodeForRole(roomId: string, role: string): Promise<RoomCode> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/role/${role}`, {});
  }

  /**
   *
   * @param code THe Room Code string
   * @param enabled Enabled status of the Room Code
   * @returns a `RoomCode` object
   */
  async enableOrDisableRoomCode(code: string, enabled: boolean): Promise<RoomCode> {
    return this.apiService.post(`${this.basePath}/code`, {
      code,
      enabled,
    });
  }
}
