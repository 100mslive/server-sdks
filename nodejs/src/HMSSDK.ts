import { logger, LogLevelOptions, setLogLevel } from "./services/LoggerService";
import { RoomService } from "./apis/RoomService";
import { AuthTokenConfig, AuthService, ManagementTokenConfig } from "./services/AuthService";
import { APIService } from "./services/APIService";
import { ActiveRoomService } from "./apis/ActiveRoomService";
import { SessionService } from "./apis/SessionService";

/**
 * Server-side SDK for 100ms REST API endpoints.
 */
export class HMSSDK {
  private readonly authService: AuthService;
  private readonly apiService: APIService;

  private readonly roomService: RoomService;
  private readonly activeRoomService: ActiveRoomService;
  private readonly sessionService: SessionService;

  /**
   * @param accessKey App Access Key from Dashboard
   * @param secret App Secret from Dashboard
   * @returns an instance of `HMSSDK`
   */
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
    this.activeRoomService = new ActiveRoomService(this.apiService);
    this.sessionService = new SessionService(this.apiService);
  }

  /**
   * Can be used to make 100ms API calls not supported in the SDK.
   * @returns an instance of `APIService`
   */
  getAPIService() {
    return this.apiService;
  }

  /**
   * Wrapper for {@link https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object Room API calls}.
   * @returns an instance of `RoomService`
   */
  getRoomService() {
    return this.roomService;
  }

  /**
   * Wrapper for {@link https://www.100ms.live/docs/server-side/v2/api-reference/active-rooms/object Active Room API calls}.
   * @returns an instance of `ActiveRoomService`
   */
  getActiveRoomService() {
    return this.activeRoomService;
  }

  /**
   * Wrapper for {@link https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object Session API calls}.
   * @returns an instance of `SessionService`
   */
  getSessionService() {
    return this.sessionService;
  }

  /**
   * Management token allows to make API calls to 100ms backend.
   * @returns Management token of type `ManagementToken`
   */
  async getManagementToken(tokenConfig?: ManagementTokenConfig) {
    return this.authService.getManagementToken(tokenConfig);
  }

  /**
   * Auth Token allows for joining Room on client side.
   * @returns Auth token of type `AuthToken`
   */
  async getAuthToken(tokenConfig: AuthTokenConfig) {
    return this.authService.getAuthToken(tokenConfig);
  }

  setLogLevel(level: LogLevelOptions) {
    setLogLevel(level);
  }
}
