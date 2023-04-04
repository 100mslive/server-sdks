import { logger } from "../services/LoggerService";
import { APIService } from "../services/APIService";
import {
  Room,
  RoomCreateOptions,
  RoomFilterOptions,
  RoomUpdateOptions,
  QueryResults,
} from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

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
   * `HMS.Room` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Room filters like enabled status and time range
   * @returns a `HMS.QueryObjectIterator<HMS.Room>` object
   */
  list(filters?: RoomFilterOptions): QueryObjectIterator<Room> {
    const queryResultsIterable = new QueryObjectIterator<Room>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  /**
   * Get the details of a room by room id.
   * @param roomId Room ID
   * @returns a `HMS.Room` object
   */
  async retrieveById(roomId: string): Promise<Room> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  /**
   * Get the details of a room by room name.
   * @param name Room name
   * @returns a `HMS.Room` object
   */
  async retrieveByName(name: string): Promise<Room> {
    const results: QueryResults<Room> = await this.apiService.get(this.basePath, { name });
    if (!results.data || results.data.length === 0) {
      const err = new Error(`no Roomfound with passed in name - ${name}`);
      logger.error("no Roomfound", err);
      throw err;
    }
    return results.data[0];
  }

  /**
   * Create a new room with a specific configuration. If the room already exists,
   * the object of that existing room will be returned.
   * @param config Config of the Room to be created
   * @returns a `HMS.Room` object
   */
  async create(config?: RoomCreateOptions): Promise<Room> {
    return this.apiService.post(this.basePath, config);
  }

  /**
   * Update an existing room's configuration like `name`, `description`,
   * `recording_info` and `region` by specifying the room id.
   * @param roomId Room ID
   * @param options Options of the Room to be updated
   * @returns a `HMS.Room` object
   */
  async update(roomId: string, options: RoomUpdateOptions): Promise<Room> {
    return this.apiService.post(`${this.basePath}/${roomId}`, options);
  }

  /**
   * Enable or disable a room. Disabling a room would block the peers from
   * any future attempts of joining that room until it is enabled again.
   * @param roomId Room ID
   * @param enabled Enabled status of Room
   * @returns a `HMS.Room` object
   */
  async enableOrDisable(roomId: string, enabled: boolean): Promise<Room> {
    return this.apiService.post(`${this.basePath}/${roomId}`, { enabled });
  }
}
