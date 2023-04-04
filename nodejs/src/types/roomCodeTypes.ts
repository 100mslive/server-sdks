export interface RoomCode {
  code: string;
  room_id: string;
  role: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}

//param types
export interface RoomCodeFilterOptions {
  role?: string;
  enabled?: boolean;
  limit?: number;
}
