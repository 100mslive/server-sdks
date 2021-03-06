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

  async getHlsStateByRoomId(roomId: string): Promise<HLSRoomState> {
    const data: Record<string, any> = await this.apiService.get("/meetings/hls", {
      room_id: roomId,
    });
    return {
      recording: {
        hlsVod: data.recording?.hls_vod,
        singleFilePerLayer: data.recording?.single_file_per_layer,
      },
      running: data.running,
      url: data.url,
    };
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
    logger.info("starting hls - ", payload);
    return this.apiService.post("/meetings/hls/start", payload);
  }

  async stopHLS({ roomId }: { roomId: string }) {
    logger.info("stopping hls for room - ", roomId);
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
  recording?: HLSRecordingConfig;
}

export interface HLSRecordingConfig {
  hlsVod?: boolean;
  singleFilePerLayer?: boolean;
}

export interface HLSRoomState {
  running: boolean;
  url?: string;
  recording?: HLSRecordingConfig;
}
