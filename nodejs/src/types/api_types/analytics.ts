export type TrackEventType = "track.add.success" | "track.update.success" | "track.remove.success";

export interface TrackEvent {
  version: string;
  id: string;
  timestamp: string;
  type: TrackEventType;
  data: {
    room_id: string;
    session_id: string;
    room_name: string;
    peer_id: string;
    user_id: string;
    user_name: string;
    joined_at: Date;
    role: string;
    track_id: string;
    stream_id: string;
    type: "audio" | "video";
    source: "regular" | "screen";
    mute: boolean;
    started_at: Date;
    stopped_at?: Date;
  };
}

export type RecordingEventType = "beam.recording.success";

export interface RecordingEvent {
  version: string;
  id: string;
  timestamp: string;
  type: RecordingEventType;
  data: {
    beam_id: string;
    room_id: string;
    session_id: string;
    peer_id: string;
    template_id: string;
    created_at: Date;
    duration: number;
    started_at: Date;
    stopped_at: Date;
    max_width: number;
    max_height: number;
    recording_path: string;
    recording_presigned_url: string;
    meeting_url: string;
    rtmp: { url: string }[];
    session_started_at: Date;
    size: number;
  };
}

// param types
export interface TrackEventFilterParams {
  type: TrackEventType[];
  room_id: string;
  session_id?: string;
  peer_id?: string;
  user_id?: string;
  limit?: number;
}

export interface RecordingEventFilterParams {
  type: RecordingEventType;
  room_id: string;
  session_id?: string;
  peer_id?: string;
  beam_id?: string;
  limit?: number;
}
