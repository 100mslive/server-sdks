import { HLSRecordingConfig, RoomService } from "./RoomService";
import { getLoggerForMethod, logger } from "../LoggerService";

export class TransportService {
  private logger = logger.child({ class: TransportService.name });
  constructor(private roomService: RoomService) {}

  async startHLS(config: StartHLSConfig) {
    const logger = getLoggerForMethod("hls-start", this.logger).child({ config });
    logger.info("starting hls");
    const room = await this.roomService.createRoom({ name: config.identifier });
    logger.debug("room created", { roomId: room.id, name: room.name });
    await this.roomService.startHLS({
      meetingUrl: config.appUrl,
      roomId: room.id,
      recording: config.recording,
    });
    logger.info("hls started");
  }

  async startHLSSync(config: StartHLSConfig) {
    await this.startHLS(config);
    // TODO: poll and get m3u8
  }

  async stopHLS({ identifier }: { identifier: string }) {
    const logger = getLoggerForMethod("hls-stop", this.logger).child({ identifier });
    logger.info("stopping hls");
    const room = await this.roomService.getRoomByName(identifier);
    await this.roomService.stopHLS({ roomId: room.id });
    logger.info("hls stopped");
  }
}

export interface StartHLSConfig {
  /**
   * convert the passed in webapp url to m3u8 stream
   */
  appUrl: string;
  /**
   * identifier from your side for the hls, use this to stop hls
   */
  identifier: string;
  recording?: HLSRecordingConfig;
}
