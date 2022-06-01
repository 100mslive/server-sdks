import { APIService } from "./APIService";
import { HMSRoom } from "./interfaces/roomInterfaces";
import { QueryResults } from "./interfaces/common";
import { logger } from "../LoggerService";

export class RoomService {
  private basePath = "/rooms";

  constructor(private apiService: APIService) {}

  async getRoomById(roomId: string): Promise<HMSRoom> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  async getRoomByName(name: string): Promise<HMSRoom> {
    const results: QueryResults<HMSRoom> = await this.apiService.get(this.basePath, { name });
    if (results.data.length === 0) {
      const err = new Error(`no room found with passed in name - ${name}`);
      logger.error("no room found", err);
      throw err;
    }
    return results.data[0];
  }

  async createRoom(config?: CreateRoomConfig): Promise<HMSRoom> {
    return this.apiService.post(this.basePath, config);
  }

  async startHLS(config: StartRoomHLSConfig) {
    const payload: Record<string, any> = {
      room_id: config.roomId,
      variants: [{ meeting_url: config.meetingUrl }],
    };
    if (config.recording) {
      payload.recording = {
        hls_vod: !!config.recording.hlsVod,
        single_file_per_layer: !!config.recording.singleFilePerLayer,
      };
    }
    return this.apiService.post("/meetings/hls/start", config);
  }

  async stopHLS(roomId: { roomId: string }) {
    await this.apiService.post("/meetings/hls/stop", { room_id: roomId });
  }
}

export interface CreateRoomConfig {
  name?: string;
  description?: string;
  template?: string;
  region?: string;
}

export interface StartRoomHLSConfig {
  roomId: string;
  meetingUrl: string;
  recording?: {
    hlsVod?: boolean;
    singleFilePerLayer?: boolean;
  };
}
