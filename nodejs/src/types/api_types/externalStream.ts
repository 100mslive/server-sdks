import { BaseBeamObject, BaseRecordingAsset, VideoResolution } from "./common";

export interface Object extends BaseBeamObject {
  destination: string;
  rtmp_urls: string[];
  recording: boolean;
  resolution: VideoResolution;
  recording_assets?: BaseRecordingAsset[];
}

// param types
export interface StartParams {
  meeting_url: string;
  rtmp_urls: string[];
  recording?: boolean;
  resolution?: VideoResolution;
  destination?: string;
}

export interface FilterParams {
  room_id?: string;
  session_id?: string;
  status?: string;
  limit?: number;
}
