import { BaseBeamObject, BaseRecordingAsset, VideoResolution } from "./common";

export interface Object extends BaseBeamObject {
  asset_types: string[];
  recording_assets?: BaseRecordingAsset[];
}

// param types
export interface StartParams {
  meeting_url: string;
  resolution?: VideoResolution;
  audio_only?: boolean;
}

export interface FilterParams {
  room_id?: string;
  session_id?: string;
  status?: string;
  limit?: number;
}
