import { logger } from "../services/LoggerService";
import { APIService } from "../services/APIService";
import { HMSRoom, HMSRoomRecordingInfo } from "./interfaces/roomInterfaces";
import { HMSQueryObjectIterator } from "../utils/HMSQueryObjectIterator";
import { QueryResults } from "./interfaces/common";

export class RoomService {
  private basePath = "/rooms";

  constructor(private apiService: APIService) {}

  /**
   *
   * @param filters Room filters like enabled status and time range
   * @returns a `QueryResultsIterator<HMSRoom>` object
   */

  getRoomsIterable(filters?: HMSRoomFilterOptions): HMSQueryObjectIterator<HMSRoom> {
    const queryResultsIterable = new HMSQueryObjectIterator<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param roomId Room ID
   * @returns a `HMSRoom` object
   */
  async getRoomById(roomId: string): Promise<HMSRoom> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  /**
   *
   * @param name Room name
   * @returns a `HMSRoom` object
   */
  async getRoomByName(name: string): Promise<HMSRoom> {
    const results: QueryResults<HMSRoom> = await this.apiService.get(this.basePath, { name });
    if (!results.data || results.data.length === 0) {
      const err = new Error(`no Roomfound with passed in name - ${name}`);
      logger.error("no Roomfound", err);
      throw err;
    }
    return results.data[0];
  }

  /**
   *
   * @param config Config of the Room to be created
   * @returns a `HMSRoom` object
   */
  async createRoom(config?: HMSRoomCreateOptions): Promise<HMSRoom> {
    return this.apiService.post(this.basePath, config);
  }

  /**
   *
   * @param roomId Room ID
   * @param options Options of the Room to be updated
   * @returns a `HMSRoom` object
   */
  async updateRoom(roomId: string, options: HMSRoomUpdateOptions): Promise<HMSRoom> {
    return this.apiService.post(`${this.basePath}/${roomId}`, options);
  }

  /**
   *
   * @param roomId Room ID
   * @param enabled Enabled status of Room
   * @returns a `HMSRoom` object
   */
  async enableOrDisableRoom(roomId: string, enabled: boolean): Promise<HMSRoom> {
    return this.apiService.post(`${this.basePath}/${roomId}`, { enabled });
  }
}

export interface HMSRoomFilterOptions {
  enabled?: boolean;
  before?: Date;
  after?: Date;
  limit?: number;
}

export interface HMSRoomUpdateOptions {
  name?: string;
  description?: string;
  recording_info?: HMSRoomRecordingInfo;
  region?: string;
}

export interface HMSRoomCreateOptions extends HMSRoomUpdateOptions {
  template_id?: string;
}
