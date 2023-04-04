import { BasePeer } from "./common";

export interface Session {
  id: string;
  room_id: string;
  customer_id: string;
  app_id: string;
  active: boolean;
  peers: Record<string, SessionPeer>;
  created_at: Date;
  updated_at: Date;
}

export interface SessionPeer extends BasePeer {
  session_id: string;
  left_at: Date;
}

// param types
export interface SessionFilterOptions {
  room_id?: string;
  active?: boolean;
  before?: Date;
  after?: Date;
  limit?: number;
}
