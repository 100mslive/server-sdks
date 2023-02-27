import { HMSBasicPeer } from "./common";

export interface HMSActiveRoom {
  id: string;
  name: string;
  customer_id: string;
  session: HMSActiveRoomSession;
}

export interface HMSActiveRoomSession {
  id: string;
  created_at: string;
  peers: string[];
}

export interface HMSActiveRoomPeer extends HMSBasicPeer {
  metadata: string;
}

export interface HMSActiveRoomPeerWithTrack extends HMSActiveRoomPeer {
  tracks: Record<string, HMSPeerTrack>;
}

export interface HMSPeerTrack {
  id: string;
  stream_id: string;
  mute: boolean;
  type: string;
  source: string;
  started_at: string;
  description: string;
}

export type HMSPeerUpdateConfig = Partial<Pick<HMSActiveRoomPeer, "name" | "role" | "metadata">>;

export interface HMSRoomMessageConfig {
  peerId?: string;
  role?: string;
  message: string;
  type?: string;
}
