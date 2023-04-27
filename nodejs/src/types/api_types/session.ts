import { BasePeer } from "./common";

export interface Object {
  id: string;
  room_id: string;
  customer_id: string;
  app_id: string;
  active: boolean;
  peers: Record<string, Peer>;
  created_at: Date;
  updated_at: Date;
}

export interface Peer extends BasePeer {
  session_id: string;
  left_at: Date;
}

// param types
export interface FilterParams {
  room_id?: string;
  active?: boolean;
  before?: Date;
  after?: Date;
  limit?: number;
}
