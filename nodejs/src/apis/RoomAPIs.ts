import { logger } from "../LoggerService";
import { APIService } from "../services/APIService";
import { QueryResults } from "./interfaces/common";
import { HMSCreateRoomConfig, HMSRoom, HMSUpdateRoomConfig } from "./interfaces/roomInterfaces";

export class RoomAPIs {
    private basePath = "/rooms";

    constructor(private apiService: APIService) { }

    async getRooms(): Promise<HMSRoom[]> {
        const results: QueryResults<HMSRoom> = await this.apiService.get(this.basePath);
        // atleast 1 room(default) will be present
        return results.data!;
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

    async getRoomsByEnabled(enabled: boolean): Promise<HMSRoom[]> {
        const results: QueryResults<HMSRoom> = await this.apiService.get(this.basePath, { enabled });
        return results.data ?? [];
    }

    async getRoomsByTimeRange(before?: Date, after?: Date): Promise<HMSRoom[]> {
        const timeQueryParams: Record<string, Date> = {};
        if (before) timeQueryParams['before'] = before;
        if (after) timeQueryParams['after'] = after;
        const results: QueryResults<HMSRoom> = await this.apiService.get(this.basePath, timeQueryParams);
        return results.data ?? [];
    }

    async createRoom(roomConfig: HMSCreateRoomConfig): Promise<HMSRoom> {
        return this.apiService.post(this.basePath, roomConfig);
    }

    async updateRoom(roomConfig: HMSUpdateRoomConfig): Promise<HMSRoom> {
        return this.apiService.post(this.basePath, roomConfig);
    }

    async enableOrDisableRoom(roomId:string, enabled: boolean): Promise<HMSRoom>  { 
        return this.apiService.post(`${this.basePath}/${roomId}`, {enabled});
    }
}