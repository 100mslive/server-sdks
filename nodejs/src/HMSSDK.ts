import { logger, LogLevelOptions, setLogLevel } from "./services/LoggerService";
import AuthService from "./services/AuthService";
import APIService from "./services/APIService";
import {
  ActiveRoomWrapper,
  AnalyticsWrapper,
  ExternalStreamWrapper,
  LiveStreamWrapper,
  RecordingAssetWrapper,
  RecordingWrapper,
  RoomCodeWrapper,
  RoomWrapper,
  SessionWrapper,
} from "./api_wrappers";

/**
 * Server-side SDK for 100ms REST API endpoints.
 */
export class HMSSDK {
  /**
   * Can be used to generate `HMS.ManagementToken` that allows to make API calls to
   * 100ms backend and `HMS.AuthToken` that allows for joining Room on client side.
   * @returns an instance of `HMS.AuthService`
   */
  readonly auth: AuthService;

  /**
   * Can be used to make 100ms API calls not supported in the SDK.
   * @returns an instance of `HMS.APIService`
   */
  readonly api: APIService;

  /**
   * @returns an instance of `HMS.ActiveRoomWrapper`
   */
  readonly activeRooms: ActiveRoomWrapper;

  /**
   * @returns an instance of `HMS.AnalyticsWrapper`
   */
  readonly analytics: AnalyticsWrapper;

  /**
   * @returns an instance of `HMS.ExternalStreamWrapper`
   */
  readonly externalStreams: ExternalStreamWrapper;

  /**
   * @returns an instance of `HMS.LiveStreamWrapper`
   */
  readonly liveStreams: LiveStreamWrapper;

  /**
   * @returns an instance of `HMS.RecordingAssetWrapper`
   */
  readonly recordingAssets: RecordingAssetWrapper;

  /**
   * @returns an instance of `HMS.RecordingWrapper`
   */
  readonly recordings: RecordingWrapper;

  /**
   * @returns an instance of `HMS.RoomCodeWrapper`
   */
  readonly roomCodes: RoomCodeWrapper;

  /**
   * @returns an instance of `HMS.RoomWrapper`
   */
  readonly rooms: RoomWrapper;

  /**
   * @returns an instance of `HMS.SessionWrapper`
   */
  readonly sessions: SessionWrapper;

  /**
   * @param accessKey App Access Key from Dashboard
   * @param secret App Secret from Dashboard
   * @returns an instance of `HMS.SDK`
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
      logger.error("Access key or secret not defined", err);
      throw err;
    }
    this.auth = new AuthService(accessKey, secret);
    this.api = new APIService(this.auth);

    this.activeRooms = new ActiveRoomWrapper(this.api);
    this.analytics = new AnalyticsWrapper(this.api);
    this.externalStreams = new ExternalStreamWrapper(this.api);
    this.liveStreams = new LiveStreamWrapper(this.api);
    this.recordingAssets = new RecordingAssetWrapper(this.api);
    this.recordings = new RecordingWrapper(this.api);
    this.roomCodes = new RoomCodeWrapper(this.api);
    this.rooms = new RoomWrapper(this.api);
    this.sessions = new SessionWrapper(this.api);
  }

  setLogLevel(level: LogLevelOptions) {
    setLogLevel(level);
  }
}
