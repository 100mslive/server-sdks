export type Type = "beam.recording.success";

export interface Object {
  version: string;
  id: string;
  timestamp: string;
  type: Type;
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

//param types
export interface FilterParams {
  type: Type;
  room_id: string;
  session_id?: string;
  peer_id?: string;
  beam_id?: string;
  limit?: number;
}
