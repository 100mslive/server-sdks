import { HMSBasicPeer } from "./common";

export interface HMSSession {
  id: string;
  room_id: string;
  customer_id: string;
  app_id: string;
  active: boolean;
  peers: Record<string, HMSSessionPeer>;
  created_at: string;
  updated_at: string;
}

export interface HMSSessionPeer extends HMSBasicPeer {
  session_id: string;
  left_at: string;
}
