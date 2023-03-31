import { APIService } from "../services/APIService";
import { HMSRoomCode, HMSRoomCodeFilterOptions, QueryResults } from "../types";
import { HMSQueryObjectIterator } from "../utils/HMSQueryObjectIterator";

export class RoomCodeService {
  private basePath = "/room-codes";

  constructor(private apiService: APIService) {}

  /**
   *
   * @param roomId
   * @param filters
   * @returns
   */
  getRoomCodesIterable(
    roomId: string,
    filters?: HMSRoomCodeFilterOptions
  ): HMSQueryObjectIterator<HMSRoomCode> {
    const queryResultsIterable = new HMSQueryObjectIterator<HMSRoomCode>(
      (queryParams: Record<string, any>) =>
        this.apiService.get(`${this.basePath}/room/${roomId}`, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param roomId
   * @returns
   */
  async createRoomCodes(roomId: string): Promise<HMSRoomCode[]> {
    const results: QueryResults<HMSRoomCode> = await this.apiService.post(
      `${this.basePath}/room/${roomId}`,
      {}
    );
    return results.data ?? [];
  }

  /**
   *
   * @param roomId
   * @param role
   * @returns
   */
  async createRoomCodeForRole(roomId: string, role: string): Promise<HMSRoomCode> {
    return this.apiService.post(`${this.basePath}/room/${roomId}/role/${role}`, {});
  }

  /**
   *
   * @param code
   * @param enabled
   * @returns
   */
  async enableOrDisableRoomCode(code: string, enabled: boolean): Promise<HMSRoomCode> {
    return this.apiService.post(`${this.basePath}/code`, {
      code,
      enabled,
    });
  }
}
