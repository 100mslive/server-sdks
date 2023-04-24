import { BaseRecordingAsset } from "./common";

export interface RecordingAsset extends BaseRecordingAsset {
  job_id: string;
  room_id: string;
  session_id: string;
}

export interface PreSignedURLForRecordingAsset {
  id: string;
  path: string;
  url: string;
  expiry: number;
}
