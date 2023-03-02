import { HMSBasicPeer } from "./common";

export interface HMSActiveRoom {
  id: string;
  name: string;
  customer_id: string;
  session: HMSActiveRoomSession;
}

export interface HMSActiveRoomSession {
  id: string;
  created_at: Date;
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
  started_at: Date;
  description: string;
}

export type HMSPeerUpdateOptions = Partial<Pick<HMSActiveRoomPeer, "name" | "role" | "metadata">>;

export interface HMSRoomMessageOptions {
  peerId?: string;
  role?: string;
  message: string;
  type?: string;
}

export interface HMSActivePeersResponse {
  peers: Record<string, HMSActiveRoomPeer>;
}

export interface HMSRemovePeerOptionsById {
  peer_id: string;
  reason?: string;
}

export interface HMSRemovePeerOptionsByRole {
  role: string;
  reason?: string;
}

export interface HMSEndActiveRoomOptions {
  reason?: string;
  lock?: boolean;
}
