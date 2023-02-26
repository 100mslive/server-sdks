import { logger, LogLevelOptions, setLogLevel } from "./services/LoggerService";
import { RoomService } from "./apis/RoomService";
import { DestinationService } from "./apis/DestinationService";
import { RoomAPIs } from "./apis/RoomAPIs";
import { AppTokenConfig, AuthService, ManagementTokenConfig } from "./services/AuthService";
import { APIService } from "./services/APIService";

export class HMSSDK {
  private readonly authService: AuthService;
  private readonly apiService: APIService;
  private readonly roomAPIs: RoomAPIs;

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
    this.roomAPIs = new RoomAPIs(this.apiService);
  }

  getApiService() {
    return this.apiService;
  }

  getRoomService() {
    return this.roomAPIs;
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

  setLogLevel(level: LogLevelOptions) {
    setLogLevel(level);
  }
}
