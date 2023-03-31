export interface HMSTemplate {
  id: string;
  name: string;
  default?: boolean;
  customerId: string;
  roles: Record<string, HMSTemplateRole>;
  settings: HMSRoomSettings;
  destinations: HMSRoomDestinations;
  createdAt: Date;
  updatedAt: Date;
  customer: string;
  appId: string;
}

// Role
export interface HMSTemplateRole {
  name: string;
  publishParams: HMSRolePublishParams;
  subscribeParams: HMSRoleSubscribeParams;
  permissions: HMSRolePermissions;
  priority: number;
  maxPeerCount: number;
}

//// Role Publish Params
export interface HMSRolePublishParams {
  allowed: HMSAllowedTracks[];
  audio: HMSAudio;
  video: HMSVideo;
  screen: HMSVideo;
  simulcast: HMSSimulcast;
}

export enum HMSAllowedTracks {
  Audio = "audio",
  Screen = "screen",
  Video = "video",
  Simulcast = "simulcast",
}

export interface HMSAudio {
  codec: HMSAudioCodec;
  bitRate: number;
}
export enum HMSAudioCodec {
  Opus = "opus",
}

export interface HMSVideo {
  codec: HMSVideoCodec;
  frameRate: number;
  width: number;
  height: number;
  bitRate?: number;
}
export enum HMSVideoCodec {
  VP8 = "vp8",
}

export interface HMSSimulcast {
  video: HMSSimulcastVideo;
  screen: HMSSimulcastVideo;
}
export interface HMSSimulcastVideo {
  layers?: HMSSimulcastVideoLayer[];
}
export interface HMSSimulcastVideoLayer {
  rid: HMSSimulcastVideoLayerRid;
  scaleResolutionDownBy: number;
  maxBitrate: number;
  maxFramerate: number;
}
export enum HMSSimulcastVideoLayerRid {
  F = "f",
  H = "h",
  Q = "q",
}

//// Role Subscribe Params
export interface HMSRoleSubscribeParams {
  subscribeToRoles: string[];
  maxSubsBitRate: number;
  subscribeDegradation: HMSSubscribeDegradation;
}
export interface HMSSubscribeDegradation {
  packetLossThreshold: number;
  degradeGracePeriodSeconds: number;
  recoverGracePeriodSeconds: number;
}

//// Role Permissions
export interface HMSRolePermissions {
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

export interface HMSRoomSettings {
  region: string;
  recording?: HMSRoomRecording;
  roomState: HMSRoomState;
  retry: {};
}

export interface HMSRoomRecording {
  enabled: boolean;
  upload: HMSRoomRecordingUpload;
}
export interface HMSRoomRecordingUpload {
  location: string;
  type: string;
  prefix: string;
  credentials: HMSRoomRecordingUploadCredentials;
  options: HMSRoomRecordingUploadOptions;
}
export interface HMSRoomRecordingUploadCredentials {
  key: string;
  secretKey: string;
}
export interface HMSRoomRecordingUploadOptions {
  region: string;
}

export interface HMSRoomState {
  messageInterval?: number;
  sendPeerList?: boolean;
  stopRoomStateOnJoin?: boolean;
  enabled?: boolean;
}

export interface HMSRoomDestinations {
  browserRecordings?: Record<string, HMSRoomBrowserRecording>;
  rtmpDestinations?: Record<string, HMSRoomRTMPDestination>;
  hlsDestinations?: Record<string, HMSRoomHLSDestination>;
}

export interface HMSRoomBrowserRecording {
  name: string;
  width: number;
  height: number;
  maxDuration: number;
  thumbnails: HMSRoomBrowserRecordingThumbnail;
  presignDuration: number;
}
export interface HMSRoomBrowserRecordingThumbnail {
  width: number;
  height: number;
}

export interface HMSRoomRTMPDestination {
  name: string;
  width: number;
  height: number;
  maxDuration: number;
  rtmpUrls: string[];
  recordingEnabled: boolean;
}

export interface HMSRoomHLSDestination {
  name: string;
  maxDuration: number;
  layers: HMSRoomHLSVideoLayer[];
  playlistType: string;
  numPlaylistSegments: number;
  videoFrameRate: number;
  enableMetadataInsertion: boolean;
  enableStaticUrl: boolean;
  recording: HMSRoomHLSRecording;
}

export interface HMSRoomHLSVideoLayer {
  width?: number;
  height?: number;
  videoBitrate?: number;
  audioBitrate?: number;
}

export interface HMSRoomHLSRecording {
  hlsVod: boolean;
  singleFilePerLayer: boolean;
  layers: HMSRoomHLSVideoLayer[];
  thumbnails: HMSRoomHLSRecordingThumbnails;
  presignDuration: number;
}
export interface HMSRoomHLSRecordingThumbnails {
  enabled: boolean;
  width: number;
  height: number;
  offsets: number[];
  fps: number;
}
