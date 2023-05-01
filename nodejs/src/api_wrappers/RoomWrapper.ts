import { logger } from "../services/LoggerService";
import APIService from "../services/APIService";
import { Room, QueryResults } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object Room API} calls.
 */
export default class RoomWrapper {
  private basePath = "/rooms";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of room objects that satisfy the `filter` params. If you want
   * to get all the rooms related to your account, don't pass in any param. A
   * `HMS.Room.Object` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Room filters like enabled status and time range
   * @returns a `HMS.QueryObjectIterator<HMS.Room.Object>` object
   */
  list(filters?: Room.FilterParams): QueryObjectIterator<Room.Object> {
    const queryObjectIterable = new QueryObjectIterator<Room.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryObjectIterable;
  }

  /**
   * Get the details of a room by room id.
   * @param roomId Room ID
   * @returns a `HMS.Room.Object` object
   */
  async retrieveById(roomId: string): Promise<Room.Object> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  /**
   * Get the details of a room by room name.
   * @param name Room name
   * @returns a `HMS.Room.Object` object
   */
  async retrieveByName(name: string): Promise<Room.Object> {
    const results: QueryResults<Room.Object> = await this.apiService.get(this.basePath, { name });
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
   * @returns a `HMS.Room.Object` object
   */
  async create(config?: Room.CreateParams): Promise<Room.Object> {
    return this.apiService.post(this.basePath, config);
  }

  /**
   * Update an existing room's configuration like `name`, `description`,
   * `recording_info` and `region` by specifying the room id.
   * @param roomId Room ID
   * @param params Options of the Room to be updated
   * @returns a `HMS.Room.Object` object
   */
  async update(roomId: string, params: Room.UpdateParams): Promise<Room.Object> {
    return this.apiService.post(`${this.basePath}/${roomId}`, params);
  }

  /**
   * Enable or disable a room. Disabling a room would block the peers from
   * any future attempts of joining that room until it is enabled again.
   * @param roomId Room ID
   * @param enabled Enabled status of Room
   * @returns a `HMS.Room.Object` object
   */
  async enableOrDisable(roomId: string, enabled: boolean): Promise<Room.Object> {
    return this.apiService.post(`${this.basePath}/${roomId}`, { enabled });
  }
}
