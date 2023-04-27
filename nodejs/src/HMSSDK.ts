import { logger, LogLevelOptions, setLogLevel } from "./services/LoggerService";
import AuthService from "./services/AuthService";
import APIService from "./services/APIService";
import { ActiveRoomWrapper, RoomCodeWrapper, RoomWrapper, SessionWrapper } from "./api_wrappers";

/**
 * Server-side SDK for 100ms REST API endpoints.
 */
export class HMSSDK {
  /**
   * Can be used to generate `ManagementToken` that allows to make API calls to
   * 100ms backend and `AuthToken` that allows for joining Room on client side.
   */
  readonly auth: AuthService;

  /**
   * Can be used to make 100ms API calls not supported in the SDK.
   * @returns an instance of `APIService`
   */
  readonly api: APIService;

  /**
   * Wrapper for {@link https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object Room API calls}.
   * @returns an instance of `RoomService`
   */
  readonly rooms: RoomWrapper;

  /**
   * Wrapper for {@link https://www.100ms.live/docs/server-side/v2/api-reference/active-rooms/object Active Room API calls}.
   * @returns an instance of `ActiveRoomService`
   */
  readonly activeRooms: ActiveRoomWrapper;

  /**
   * Wrapper for {@link https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object Session API calls}.
   * @returns an instance of `SessionService`
   */
  readonly sessions: SessionWrapper;

  /**
   * Wrapper for {@link https://www.100ms.live/docs/server-side/v2/api-reference/room-codes/room-code-object Room Code API calls}.
   * @returns an instance of `RoomCodeService`
   */
  readonly roomCodes: RoomCodeWrapper;

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
    this.auth = new AuthService(accessKey, secret);
    this.api = new APIService(this.auth);

    this.rooms = new RoomWrapper(this.api);
    this.activeRooms = new ActiveRoomWrapper(this.api);
    this.sessions = new SessionWrapper(this.api);
    this.roomCodes = new RoomCodeWrapper(this.api);
  }

  setLogLevel(level: LogLevelOptions) {
    setLogLevel(level);
  }
}
