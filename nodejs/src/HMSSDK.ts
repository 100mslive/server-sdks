import { AppTokenConfig, AuthService, ManagementTokenConfig } from "./apis/AuthService";
import { logger } from "./LoggerService";
import { APIService } from "./apis/APIService";
import { RoomService } from "./apis/RoomService";
import { DestinationService } from "./apis/DestinationService";

export class HMSSDK {
  private readonly authService: AuthService;
  private readonly apiService: APIService;
  private readonly roomService: RoomService;
  private readonly destinationService: DestinationService;

  constructor(accessKey?: string, secret?: string) {
    if (!accessKey) {
      accessKey = process.env.HMS_ACCESS_KEY;
    }
    if (!secret) {
      secret = process.env.HMS_SECRET;
    }
    if (!accessKey || !secret) {
      const err = new Error("Please provide access key and secret key.");
      logger.error("access key or secret is not defined", err);
      throw err;
    }
    this.authService = new AuthService(accessKey, secret);
    this.apiService = new APIService(this.authService);
    this.roomService = new RoomService(this.apiService);
    this.destinationService = new DestinationService(this.roomService);
  }

  getApiService() {
    return this.apiService;
  }

  getRoomService() {
    return this.roomService;
  }

  /**
   * use destination service to start recording/streaming
   */
  getDestinationService() {
    return this.destinationService;
  }

  /**
   * management token allows to make API calls to 100ms backend
   */
  async getManagementToken(tokenConfig?: ManagementTokenConfig) {
    return this.authService.getManagementToken(tokenConfig);
  }

  /**
   * App Token allows for joining room on client side
   */
  async getAppToken(tokenConfig: AppTokenConfig) {
    return this.authService.getAppToken(tokenConfig);
  }

  setLogLevel(level: string) {
    logger.level = level;
  }
}
