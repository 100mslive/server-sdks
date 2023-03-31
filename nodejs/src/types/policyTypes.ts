export interface Template {
  id: string;
  name: string;
  default?: boolean;
  customerId: string;
  roles: Record<string, TemplateRole>;
  settings: RoomSettings;
  destinations: RoomDestinations;
  createdAt: Date;
  updatedAt: Date;
  customer: string;
  appId: string;
}

// Role
export interface TemplateRole {
  name: string;
  publishParams: RolePublishParams;
  subscribeParams: RoleSubscribeParams;
  permissions: RolePermissions;
  priority: number;
  maxPeerCount: number;
}

//// Role Publish Params
export interface RolePublishParams {
  allowed: AllowedTracks[];
  audio: Audio;
  video: Video;
  screen: Video;
  simulcast: Simulcast;
}

export enum AllowedTracks {
  Audio = "audio",
  Screen = "screen",
  Video = "video",
  Simulcast = "simulcast",
}

export interface Audio {
  codec: AudioCodec;
  bitRate: number;
}
export enum AudioCodec {
  Opus = "opus",
}

export interface Video {
  codec: VideoCodec;
  frameRate: number;
  width: number;
  height: number;
  bitRate?: number;
}
export enum VideoCodec {
  VP8 = "vp8",
}

export interface Simulcast {
  video: SimulcastVideo;
  screen: SimulcastVideo;
}
export interface SimulcastVideo {
  layers?: SimulcastVideoLayer[];
}
export interface SimulcastVideoLayer {
  rid: SimulcastVideoLayerRid;
  scaleResolutionDownBy: number;
  maxBitrate: number;
  maxFramerate: number;
}
export enum SimulcastVideoLayerRid {
  F = "f",
  H = "h",
  Q = "q",
}

//// Role Subscribe Params
export interface RoleSubscribeParams {
  subscribeToRoles: string[];
  maxSubsBitRate: number;
  subscribeDegradation: SubscribeDegradation;
}
export interface SubscribeDegradation {
  packetLossThreshold: number;
  degradeGracePeriodSeconds: number;
  recoverGracePeriodSeconds: number;
}

//// Role Permissions
export interface RolePermissions {
  endRoom?: boolean;
  removeOthers?: boolean;
  mute?: boolean;
  unmute?: boolean;
  changeRole?: boolean;
  sendRoomState?: boolean;
  rtmpStreaming: boolean;
  hlsStreaming: boolean;
  browserRecording: boolean;
}

export interface RoomSettings {
  region: string;
  recording?: RoomRecording;
  roomState: RoomState;
  retry: {};
}

export interface RoomRecording {
  enabled: boolean;
  upload: RoomRecordingUpload;
}
export interface RoomRecordingUpload {
  location: string;
  type: string;
  prefix: string;
  credentials: RoomRecordingUploadCredentials;
  options: RoomRecordingUploadOptions;
}
export interface RoomRecordingUploadCredentials {
  key: string;
  secretKey: string;
}
export interface RoomRecordingUploadOptions {
  region: string;
}

export interface RoomState {
  messageInterval?: number;
  sendPeerList?: boolean;
  stopRoomStateOnJoin?: boolean;
  enabled?: boolean;
}

export interface RoomDestinations {
  browserRecordings?: Record<string, RoomBrowserRecording>;
  rtmpDestinations?: Record<string, RoomRTMPDestination>;
  hlsDestinations?: Record<string, RoomHLSDestination>;
}

export interface RoomBrowserRecording {
  name: string;
  width: number;
  height: number;
  maxDuration: number;
  thumbnails: RoomBrowserRecordingThumbnail;
  presignDuration: number;
}
export interface RoomBrowserRecordingThumbnail {
  width: number;
  height: number;
}

export interface RoomRTMPDestination {
  name: string;
  width: number;
  height: number;
  maxDuration: number;
  rtmpUrls: string[];
  recordingEnabled: boolean;
}

export interface RoomHLSDestination {
  name: string;
  maxDuration: number;
  layers: RoomHLSVideoLayer[];
  playlistType: string;
  numPlaylistSegments: number;
  videoFrameRate: number;
  enableMetadataInsertion: boolean;
  enableStaticUrl: boolean;
  recording: RoomHLSRecording;
}

export interface RoomHLSVideoLayer {
  width?: number;
  height?: number;
  videoBitrate?: number;
  audioBitrate?: number;
}

export interface RoomHLSRecording {
  hlsVod: boolean;
  singleFilePerLayer: boolean;
  layers: RoomHLSVideoLayer[];
  thumbnails: RoomHLSRecordingThumbnails;
  presignDuration: number;
}
export interface RoomHLSRecordingThumbnails {
  enabled: boolean;
  width: number;
  height: number;
  offsets: number[];
  fps: number;
}
