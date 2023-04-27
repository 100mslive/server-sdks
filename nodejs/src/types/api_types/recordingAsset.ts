import { BaseRecordingAsset } from "./common";

export interface Object extends BaseRecordingAsset {
  job_id: string;
  room_id: string;
  session_id: string;
}

export interface PreSignedURL {
  id: string;
  path: string;
  url: string;
  expiry: number;
}

// param types
export interface FilterParams {
  room_id?: string;
  session_id?: string;
  status?: string;
  limit?: number;
}

export interface PreSignedURLParams {
  presign_duration?: number;
}
