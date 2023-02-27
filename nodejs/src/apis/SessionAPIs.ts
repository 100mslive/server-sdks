import { APIService } from "../services/APIService";
import { QueryResults } from "./interfaces/common";
import { HMSSession } from "./interfaces/sessionInterfaces";

export class SessionAPIs {
  private basePath = "/sessions";

  constructor(private apiService: APIService) {}

  async getAllSessions(): Promise<HMSSession[]> {
    const results: QueryResults<HMSSession> = await this.apiService.get(this.basePath);
    return results.data ?? [];
  }

  async getSessionById(sessionId: string): Promise<HMSSession> {
    return this.apiService.get(`${this.basePath}/${sessionId}`);
  }

  async getSessionsByRoomId(roomId: string): Promise<HMSSession[]> {
    const results: QueryResults<HMSSession> = await this.apiService.get(this.basePath, {
      room_id: roomId,
    });
    return results.data ?? [];
  }

  async getSessionsByActive(active: boolean): Promise<HMSSession[]> {
    const results: QueryResults<HMSSession> = await this.apiService.get(this.basePath, { active });
    return results.data ?? [];
  }

  async getSessionsByTimeRange(before?: Date, after?: Date): Promise<HMSSession[]> {
    const timeQueryParams: Record<string, Date> = {};
    if (before) timeQueryParams["before"] = before;
    if (after) timeQueryParams["after"] = after;
    const results: QueryResults<HMSSession> = await this.apiService.get(
      this.basePath,
      timeQueryParams
    );
    return results.data ?? [];
  }
}
