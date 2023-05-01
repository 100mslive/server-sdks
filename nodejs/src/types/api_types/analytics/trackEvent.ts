export type Type = "track.add.success" | "track.update.success" | "track.remove.success";

export interface Object {
  version: string;
  id: string;
  timestamp: string;
  type: Type;
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

// param types
export interface FilterParams {
  type: Type[];
  room_id: string;
  session_id?: string;
  peer_id?: string;
  user_id?: string;
  limit?: number;
}
