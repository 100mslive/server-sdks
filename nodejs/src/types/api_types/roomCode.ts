export interface Object {
  code: string;
  room_id: string;
  role: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}

//param types
export interface FilterParams {
  role?: string;
  enabled?: boolean;
  limit?: number;
}
