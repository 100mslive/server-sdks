import { BaseRecordingAsset } from "./common";

export interface RecordingAsset extends BaseRecordingAsset {
  job_id: string;
  room_id: string;
  session_id: string;
}

export interface RecordingAssetPreSignedURL {
  id: string;
  path: string;
  url: string;
  expiry: number;
}

// param types
export interface RecordingAssetFilterParams {
  room_id?: string;
  session_id?: string;
  status?: string;
  limit?: number;
}

export interface RecordingAssetPreSignedURLParams {
  presign_duration?: number;
}
