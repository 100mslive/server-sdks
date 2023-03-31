import { logger } from "../services/LoggerService";
import { APIService } from "../services/APIService";
import { HMSQueryObjectIterator } from "../utils/HMSQueryObjectIterator";
import {
  HMSRoom,
  HMSRoomCreateOptions,
  HMSRoomFilterOptions,
  HMSRoomUpdateOptions,
  QueryResults,
} from "../types";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object Room API} calls.
 */
export class RoomService {
  private basePath = "/rooms";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of room objects that satisfy the `filter` options. If you want
   * to get all the rooms related to your account, don't pass in any param. A
   * `HMSRoom` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Room filters like enabled status and time range
   * @returns a `HMSQueryObjectIterator<HMSRoom>` object
   */
  getRoomsIterable(filters?: HMSRoomFilterOptions): HMSQueryObjectIterator<HMSRoom> {
    const queryResultsIterable = new HMSQueryObjectIterator<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   * Get the details of a room by room id.
   * @param roomId Room ID
   * @returns a `HMSRoom` object
   */
  async getRoomById(roomId: string): Promise<HMSRoom> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  /**
   * Get the details of a room by room name.
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
   * Create a new room with a specific configuration. If the room already exists,
   * the object of that room will be returned.
   * @param config Config of the Room to be created
   * @returns a `HMSRoom` object
   */
  async createRoom(config?: HMSRoomCreateOptions): Promise<HMSRoom> {
    return this.apiService.post(this.basePath, config);
  }

  /**
   * Update an existing room's configuration like `name`, `description`,
   * `recording_info` and `region` by specifying the room id.
   * @param roomId Room ID
   * @param options Options of the Room to be updated
   * @returns a `HMSRoom` object
   */
  async updateRoom(roomId: string, options: HMSRoomUpdateOptions): Promise<HMSRoom> {
    return this.apiService.post(`${this.basePath}/${roomId}`, options);
  }

  /**
   * Enable or disable a room. Disabling a room would block the peers from
   * any future attempts of joining that room until it is enabled again.
   * @param roomId Room ID
   * @param enabled Enabled status of Room
   * @returns a `HMSRoom` object
   */
  async enableOrDisableRoom(roomId: string, enabled: boolean): Promise<HMSRoom> {
    return this.apiService.post(`${this.basePath}/${roomId}`, { enabled });
  }
}
