import { BaseBeamObject, BaseRecordingAsset } from "./common";

export interface LiveStream extends BaseBeamObject {
  recording: LiveStreamRecording;
  playback: LiveStreamPlayback;
  destination: string;
  recording_assets?: BaseRecordingAsset[];
}

export interface LiveStreamRecording {
  hls_vod: boolean;
  single_file_per_layer: boolean;
}

export interface LiveStreamPlayback {
  url: string;
}

// param types
export interface LiveStreamStartParams {
  meeting_url: string;
  recording?: LiveStreamRecording;
  destination?: string;
}

export interface LiveStreamFilterParams {
  room_id?: string;
  session_id?: string;
  status?: string;
  limit?: number;
}

export interface TimedMetadataParams {
  payload: string;
  duration: number;
}
