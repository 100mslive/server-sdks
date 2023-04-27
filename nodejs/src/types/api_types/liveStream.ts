import { BaseBeamObject, BaseRecordingAsset } from "./common";

export interface Object extends BaseBeamObject {
  recording: Recording;
  playback: Playback;
  destination: string;
  recording_assets?: BaseRecordingAsset[];
}

export interface Recording {
  hls_vod: boolean;
  single_file_per_layer: boolean;
}

export interface Playback {
  url: string;
}

// param types
export interface StartParams {
  meeting_url: string;
  recording?: Recording;
  destination?: string;
}

export interface FilterParams {
  room_id?: string;
  session_id?: string;
  status?: string;
  limit?: number;
}

export interface TimedMetadataParams {
  payload: string;
  duration: number;
}
