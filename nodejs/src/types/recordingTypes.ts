import { BaseBeamObject, BaseRecordingAsset, VideoResolution } from "./common";

export interface Recording extends BaseBeamObject {
  asset_types: string[];
  recording_assets?: BaseRecordingAsset[];
}

// param types
export interface RecordingStartParams {
  meeting_url: string;
  resolution?: VideoResolution;
  audio_only?: boolean;
}

export interface RecordingFilterParams {
  room_id?: string;
  session_id?: string;
  status?: string;
  limit?: number;
}
