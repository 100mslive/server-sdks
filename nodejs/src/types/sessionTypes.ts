import { HMSBasePeer } from "./common";

export interface HMSSession {
  id: string;
  room_id: string;
  customer_id: string;
  app_id: string;
  active: boolean;
  peers: Record<string, HMSSessionPeer>;
  created_at: Date;
  updated_at: Date;
}

export interface HMSSessionPeer extends HMSBasePeer {
  session_id: string;
  left_at: Date;
}

// param types
export interface HMSSessionFilterOptions {
  room_id?: string;
  active?: boolean;
  before?: Date;
  after?: Date;
  limit?: number;
}
