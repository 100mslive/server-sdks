export interface BasePeer {
  id: string;
  name: string;
  role: string;
  user_id: string;
  joined_at: Date;
}

/**
 * Common interface to extend for all beam related API objects including
 * live streams, external streams and recordings.
 */
export interface BaseBeamObject {
  id: string;
  room_id: string;
  session_id: string;
  status: string;
  created_at: Date;
  started_at?: Date;
  updated_at: Date;
  stopped_at?: Date;
  meeting_url: string;
  started_by: string;
  stopped_by: string;
}

export interface BaseRecordingAsset {
  id: string;
  thumbnails?: string[];
  duration: number;
  path: string;
  status: string;
  created_at: Date;
  type: string;
  size: number;
  metadata: RecordingMetadata;
}

export interface RecordingMetadata {
  resolution?: VideoResolution;
  num_layers?: string;
  layer?: string;
  max_width?: number;
  max_height?: number;
  media_type?: string;
}

export interface VideoResolution {
  width: number;
  height: number;
}
