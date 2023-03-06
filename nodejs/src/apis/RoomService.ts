import { logger } from "../services/LoggerService";
import { APIService } from "../services/APIService";
import { QueryResults } from "./interfaces/common";
import {
  HMSCreateRoomConfig,
  HMSRoom,
  HMSUpdateRoomConfig as HMSUpdateRoomOptions,
} from "./interfaces/roomInterfaces";
import { QueryResultsIterator } from "../utils/QueryResultsIterator";

export class RoomService {
  private basePath = "/rooms";

  constructor(private apiService: APIService) {}

  /**
   *
   * @returns a `QueryResultsIterator<HMSRoom>` object
   */
  getRoomsIterable(): QueryResultsIterator<HMSRoom> {
    const queryResultsIterable = new QueryResultsIterator<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      {}
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
   * @param enabled Enabled status of Room
   * @returns a `QueryResultsIterator<HMSRoom>` object
   */
  getRoomsByEnabledIterable(enabled: boolean): QueryResultsIterator<HMSRoom> {
    const queryResultsIterable = new QueryResultsIterator<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      { enabled }
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param before Timestamp before which the Rooms were created
   * @param after Timestamp after which the Rooms were created
   * @returns a `QueryResultsIterator<HMSRoom>` object
   */
  getRoomsByTimeRangeIterable(before?: Date, after?: Date): QueryResultsIterator<HMSRoom> {
    const timeQueryParams: Record<string, Date> = {};
    if (before) timeQueryParams["before"] = before;
    if (after) timeQueryParams["after"] = after;

    const queryResultsIterable = new QueryResultsIterator<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      timeQueryParams
    );
    return queryResultsIterable;
  }

  /**
   *
   * @param config Config of the Room to be created
   * @returns a `HMSRoom` object
   */
  async createRoom(config?: HMSCreateRoomConfig): Promise<HMSRoom> {
    return this.apiService.post(this.basePath, config);
  }

  /**
   *
   * @param roomId Room ID
   * @param options Options of the Room to be updated
   * @returns a `HMSRoom` object
   */
  async updateRoom(roomId: string, options: HMSUpdateRoomOptions): Promise<HMSRoom> {
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
