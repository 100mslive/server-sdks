import { logger } from "../services/LoggerService";
import { APIService } from "../services/APIService";
import { QueryResults } from "./interfaces/common";
import { HMSCreateRoomConfig, HMSRoom, HMSUpdateRoomConfig } from "./interfaces/roomInterfaces";
import { QueryResultsIterator } from "../utils/queryResultsIterator";

export class RoomAPIs {
  private basePath = "/rooms";

  constructor(private apiService: APIService) {}

  async getRoomsIterator(): Promise<QueryResultsIterator<HMSRoom>> {
    const queryResultsIterator = await QueryResultsIterator.create<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      {}
    );
    return queryResultsIterator;
  }

  async getRoomById(roomId: string): Promise<HMSRoom> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  async getRoomByName(name: string): Promise<HMSRoom> {
    const results: QueryResults<HMSRoom> = await this.apiService.get(this.basePath, { name });
    if (!results.data || results.data.length === 0) {
      const err = new Error(`no room found with passed in name - ${name}`);
      logger.error("no room found", err);
      throw err;
    }
    return results.data[0];
  }

  async getRoomsByEnabledIterator(enabled: boolean): Promise<QueryResultsIterator<HMSRoom>> {
    const queryResultsIterator = await QueryResultsIterator.create<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      { enabled }
    );
    return queryResultsIterator;
  }

  async getRoomsByTimeRangeIterator(
    before?: Date,
    after?: Date
  ): Promise<QueryResultsIterator<HMSRoom>> {
    const timeQueryParams: Record<string, Date> = {};
    if (before) timeQueryParams["before"] = before;
    if (after) timeQueryParams["after"] = after;

    const queryResultsIterator = await QueryResultsIterator.create<HMSRoom>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      timeQueryParams
    );
    return queryResultsIterator;
  }

  async createRoom(roomConfig: HMSCreateRoomConfig): Promise<HMSRoom> {
    return this.apiService.post(this.basePath, roomConfig);
  }

  async updateRoom(roomConfig: HMSUpdateRoomConfig): Promise<HMSRoom> {
    return this.apiService.post(this.basePath, roomConfig);
  }

  async enableOrDisableRoom(roomId: string, enabled: boolean): Promise<HMSRoom> {
    return this.apiService.post(`${this.basePath}/${roomId}`, { enabled });
  }
}
